import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ImportExportService {

  constructor() { }

  /**
   * Export des données en format CSV
   */
  exportToCSV(data: any[], filename: string, headers: string[]): void {
    const csvContent = this.convertToCSV(data, headers);
    this.downloadFile(csvContent, filename, 'text/csv');
  }

  /**
   * Export des données en format JSON
   */
  exportToJSON(data: any[], filename: string): void {
    const jsonContent = JSON.stringify(data, null, 2);
    this.downloadFile(jsonContent, filename, 'application/json');
  }

  /**
   * Export des données en format Excel (XLSX)
   */
  exportToExcel(data: any[], filename: string, headers: string[]): void {
    // Pour une implémentation complète, il faudrait utiliser une librairie comme xlsx
    // Ici on simule avec un CSV pour la démonstration
    this.exportToCSV(data, filename.replace('.xlsx', '.csv'), headers);
  }

  /**
   * Import de fichier CSV
   */
  importFromCSV(file: File): Promise<any[]> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const csv = e.target?.result as string;
          const data = this.parseCSV(csv);
          resolve(data);
        } catch (error) {
          reject(error);
        }
      };
      reader.onerror = () => reject(new Error('Erreur lors de la lecture du fichier'));
      reader.readAsText(file);
    });
  }

  /**
   * Import de fichier JSON
   */
  importFromJSON(file: File): Promise<any[]> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const json = e.target?.result as string;
          const data = JSON.parse(json);
          resolve(Array.isArray(data) ? data : [data]);
        } catch (error) {
          reject(error);
        }
      };
      reader.onerror = () => reject(new Error('Erreur lors de la lecture du fichier'));
      reader.readAsText(file);
    });
  }

  /**
   * Conversion des données en format CSV
   */
  private convertToCSV(data: any[], headers: string[]): string {
    if (!data || data.length === 0) return '';

    const csvHeaders = headers.join(',');
    const csvRows = data.map(row => {
      return headers.map(header => {
        const value = this.getNestedValue(row, header);
        return this.escapeCSVValue(value);
      }).join(',');
    });

    return [csvHeaders, ...csvRows].join('\n');
  }

  /**
   * Parsing du contenu CSV
   */
  private parseCSV(csv: string): any[] {
    const lines = csv.split('\n');
    if (lines.length < 2) return [];

    const headers = lines[0].split(',').map(h => h.trim());
    const data: any[] = [];

    for (let i = 1; i < lines.length; i++) {
      if (lines[i].trim()) {
        const values = lines[i].split(',');
        const row: any = {};
        headers.forEach((header, index) => {
          row[header] = values[index]?.trim() || '';
        });
        data.push(row);
      }
    }

    return data;
  }

  /**
   * Récupération d'une valeur imbriquée dans un objet
   */
  private getNestedValue(obj: any, path: string): any {
    return path.split('.').reduce((current, key) => current?.[key], obj) || '';
  }

  /**
   * Échappement des valeurs CSV
   */
  private escapeCSVValue(value: any): string {
    if (value === null || value === undefined) return '';
    const stringValue = String(value);
    if (stringValue.includes(',') || stringValue.includes('"') || stringValue.includes('\n')) {
      return `"${stringValue.replace(/"/g, '""')}"`;
    }
    return stringValue;
  }

  /**
   * Téléchargement d'un fichier
   */
  private downloadFile(content: string, filename: string, mimeType: string): void {
    const blob = new Blob([content], { type: mimeType });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  }

  /**
   * Validation du format de fichier
   */
  validateFileType(file: File, allowedTypes: string[]): boolean {
    return allowedTypes.includes(file.type) || 
           allowedTypes.some(type => file.name.toLowerCase().endsWith(type.replace('.', '')));
  }

  /**
   * Génération d'un nom de fichier avec timestamp
   */
  generateFilename(prefix: string, extension: string): string {
    const timestamp = new Date().toISOString().slice(0, 19).replace(/:/g, '-');
    return `${prefix}_${timestamp}.${extension}`;
  }
}
