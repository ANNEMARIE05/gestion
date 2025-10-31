declare const environment: {
  production: boolean;
  apiUrl: string;
  appName: string;
  version: string;
  defaultLanguage: string;
  supportedLanguages: string[];
  maxFileSize: number;
  supportedFileTypes: string[];
  notificationDuration: number;
  pagination: {
    defaultPageSize: number;
    pageSizeOptions: number[];
  };
  features: {
    enableNotifications: boolean;
    enableAnimations: boolean;
    enableDarkMode: boolean;
    enableExport: boolean;
    enableImport: boolean;
  };
};