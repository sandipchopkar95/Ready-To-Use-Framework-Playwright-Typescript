export const testConfig = {
    baseURL: 'https://opensource-demo.orangehrmlive.com',
    headless : false,
    parallel: false,
    storagePaths: {
        admin: 'src/sessiondata/admin.json',
        user: 'src/sessiondata/user.json',
    },
    endpoints : {
        login:'/web/index.php/auth/login',
        dashboardUrl:'/web/index.php/dashboard/index',
    }
};
