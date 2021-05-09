var config = {
  name: 'Popover',
  repo: 'sa-si-dev/popover',
};

window.$docsify = {
  name: config.name,
  repo: config.repo,
  themeColor: '#ff6502',
  homepage: 'get-started.md',
  topMargin: 50,
  loadSidebar: true,
  coverpage: true,
  auto2top: true,
  executeScript: true,
  copyCode: {
    buttonText: 'Copy',
  },
  plugins: [docsifyPlugin],
};

function docsifyPlugin(hook, vm) {
  hook.beforeEach(docsifyPluginBeforeEach);
  hook.doneEach(docsifyPluginDoneEach);
}

function docsifyPluginBeforeEach(content) {
  content = replacePlaceholders(content);

  return content;
}

function docsifyPluginDoneEach() {
  replacePlaceholdersForElement('.sidebar-nav');
  replacePlaceholdersForElement('.docsify-pagination-container');
}

function replacePlaceholdersForElement(selector) {
  var ele = document.querySelector(selector);

  if (!ele) {
    return;
  }

  ele.innerHTML = replacePlaceholders(ele.innerHTML);
}

function replacePlaceholders(content) {
  Object.keys(config).forEach(function (placeholder) {
    var value = config[placeholder];

    if (value) {
      var regexp = new RegExp('{{' + placeholder + '}}', 'g');
      content = content.replace(regexp, value);
    }
  });

  return content;
}

function initPageGetStarted() {
  replacePlaceholdersForElement('.cover-main');
  addGetStartedPageEvents();
  initSamplePopover();
}

function initSamplePopover(position) {
  PopoverComponent.init({
    ele: '.sample-popover',
    target: '#sample-popover-target',
    position: position,
  });
}

function addGetStartedPageEvents() {
  document.querySelector('.sample-popover-position-container').addEventListener('change', onPopoverPositionChange);
}

function onPopoverPositionChange(e) {
  var $ele = e.target;

  if ($ele.type === 'radio') {
    initSamplePopover($ele.value);
  }
}
