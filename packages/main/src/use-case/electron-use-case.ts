import { ipcMain, app } from 'electron';

/**
 *
 */
ipcMain.on('electron:app:getPath', (event, name) => {
  const path = app.getPath(name);
  event.returnValue = path;
});
