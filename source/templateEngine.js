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

function templateEngine(template, data) {
    let result = '';
    let i = 0;
    
    while (i < template.length) {
        if (template[i] === '{' && template[i + 1] === '{') {
            i += 2;
            let path = '';
            while (i < template.length && !(template[i] === '}' && template[i + 1] === '}')) {
                path += template[i];
                i++;
            }
            i += 2; 
            const keys = path.trim().split('.');
            let value = data;
            
            for (const key of keys) {
                if (value && typeof value === 'object' && key in value) {
                    value = value[key];
                } else {
                    value = undefined;
                    break;
                }
            }
            result += value !== undefined ? value : '';
        } else {
            result += template[i];
            i++;
        }
    }
    return result;
}
