'use strict';

/**
 * Шаблонизатор заменяет выражения {{ path.to.value }} в строке шаблона
 * соответствующими значениями из объекта данных.
 * 
 * @function templateEngine
 * @param {string} template - Строка шаблона, содержащая выражения для замены в формате {{ ... }}
 * @param {Object} data - Объект с данными, из которого извлекаются значения для подстановки
 * @returns {string} Строка с замененными выражениями. Если значение не найдено, подставляется пустая строка
 */
const templateEngine = (template, data) => {
    const isTemplateString = typeof template === 'string' || template instanceof String;
    const isDataObject = data !== null && typeof data === 'object' && !Array.isArray(data);

    if (!isTemplateString || !isDataObject) {
        throw new TypeError('Invalid arguments');
    }

    const regex = /\{\{\s*([^}]+)\s*\}\}/g;

    return String(template).replaceAll(regex, (match, path) => {
        const keys = path.trim().split('.');
        const value = keys.reduce((acc, key) => acc?.[key], data);

        return value == null ? '' : String(value);
    });
};
