// console.log(666);
const os = require('os'); // 引入 os 模块
const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const fs = require('fs');

function writeFile(_, data) {
    // fs.writeFileSync('D:/hello.txt', data); //windows下可以直接写入，mac下会报错
    const downloadPath = path.join(os.homedir(), 'Downloads', 'hello.txt'); // 获取用户目录
    fs.writeFileSync(downloadPath, data);
}

function createWindow() {
    let win = new BrowserWindow({
        width: 800,
        height: 600,
        autoHideMenuBar: true,
        webPreferences: {
            preload: path.resolve(__dirname, './preload.js')
        }
    })

    ipcMain.on('file-save', writeFile);
    ipcMain.handle('file-read', () => {
        const downloadPath = path.join(os.homedir(), 'Downloads', 'hello.txt'); // 获取用户目录
        const res = fs.readFileSync(downloadPath, 'utf-8');
        return res;
    });

    win.loadFile('./pages/index.html');
    // win.webContents.openDevTools(); // 打开开发者工具
};

console.log(process.version);

app.on('ready', () => {
    console.log('ready');

    createWindow();

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) createWindow() // 当应用被激活时，窗口为空时创建窗口
      });

});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit() // mac系统不退出
});