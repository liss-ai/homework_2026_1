'use strict';

/**
 * Шаблонизатор заменяет выражения {{ path.to.value }} в строке шаблона
 * соответствующими значениями из объекта данных.
 * 
 * @function templateEngine
 * @param {string} template - Строка шаблона, содержащая выражения для замены в формате {{ ... }}
 * @param {Object} data - Объект с данными, из которого извлекаются значения для подстановки
 * @returns {string} Строка с замененными выражениями. Если значение не найдено, подставляется пустая строка
 * 
 * @example
 * const template = 'Привет, {{ user.name }}! Ваш баланс: {{ account.balance }}';
 * const data = {
 *   user: { name: 'Иван' },
 *   account: { balance: 1000 }
 * };
 * 
 * const result = templateEngine(template, data);
 * console.log(result); // 'Привет, Иван! Ваш баланс: 1000'
 */

const templateEngine = (template, data) => {
    const regex = /\{\{\s*([^}]+)\s*\}\}/g;
    
    return template.replace(regex, (match, path) => {
        const keys = path.trim().split('.');
        let value = data;
        
        for (const key of keys) {
            if (value && typeof value === 'object' && key in value) {
                value = value[key];
            } else {
                return '';
            }
        }
        
        if (value === undefined || value === null) {
            return '';
        }
        
        if (typeof value === 'object') {
            return JSON.stringify(value);
        }
        
        return String(value);
    });
};