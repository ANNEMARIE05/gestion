export const environment = {
  production: false,
  apiUrl: 'http://localhost:3000/api',
  appName: 'Gestion Entreprise',
  version: '1.0.0',
  defaultLanguage: 'fr',
  supportedLanguages: ['fr', 'en'],
  maxFileSize: 10 * 1024 * 1024, // 10MB
  supportedFileTypes: ['.xlsx', '.xls', '.csv', '.json'],
  notificationDuration: 5000,
  pagination: {
    defaultPageSize: 10,
    pageSizeOptions: [5, 10, 25, 50, 100]
  },
  features: {
    enableNotifications: true,
    enableAnimations: true,
    enableDarkMode: false,
    enableExport: true,
    enableImport: true
  }
};
