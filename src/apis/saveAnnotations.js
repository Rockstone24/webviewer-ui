import core from 'core';
import $ from 'jquery';

export default store => () => new Promise((resolve, reject) => {
  const state = store.getState();
  const { id: docId } = state.document;
  const { serverUrl, serverUrlHeaders } = state.advanced;
  const docIdQuery = docId ? { did: docId } : {};

  if (!serverUrl) {
    console.warn('serverUrl option is not defined. Please pass this option in WebViewer constructor to save/load annotations. See https://www.pdftron.com/documentation/web/guides/annotations/saving-loading-annotations for details.');
    reject();
    return;
  }

  core.exportAnnotations().then(data => {
    $.ajax({
      type: 'POST',
      url: serverUrl,
      headers: serverUrlHeaders,
      data: {
        ...docIdQuery,
        data,
      },
      success: () => {
        resolve();
      },
      error: e => {
        reject(e);
      },
    });
  });
});
