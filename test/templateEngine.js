'use strict';

QUnit.module("Тестируем функцию templateEngine", function() {
    QUnit.test("Работает правильно с простым шаблоном с одной переменной", function(assert) {
        const template = "Привет, {{name}}!";
        const data = { name: "Технопарк" };
        const result = templateEngine(template, data);

        assert.equal(result, "Привет, Технопарк!");
    });

    QUnit.test("Работает правильно с шаблоном с отсутствующими переменными", function(assert) {
        const template = "Привет, {{name}}! Тебе {{age}} лет.";
        const data = { name: "Технопарк" };
        const result = templateEngine(template, data);

        assert.equal(result, "Привет, Технопарк! Тебе  лет."); // Возраст не найден, заменён на пустую строку
    });

    QUnit.test("Работает правильно с шаблоном с вложенными переменными", function(assert) {
        const template = "Город: {{address.city}}, Улица: {{address.street}}";
        const data = { address: { city: "Москва", street: "2-я Бауманская" } };
        const result = templateEngine(template, data);

        assert.equal(result, "Город: Москва, Улица: 2-я Бауманская");
    });

    QUnit.test("Работает с пробелами внутри фигурных скобок", function(assert) {
        const template = "Привет, {{  name  }}!";
        const data = { name: "Технопарк" };
        const result = templateEngine(template, data);

        assert.equal(result, "Привет, Технопарк!");
    });

    QUnit.test("Обрабатывает разные типы данных", function(assert) {
        const template = "Число: {{number}}, Булево: {{boolean}}, Объект: {{object.key}}";
        const data = { 
            number: 42, 
            boolean: true,
            object: { key: "value" }
        };
        const result = templateEngine(template, data);

        assert.equal(result, "Число: 42, Булево: true, Объект: value");
    });

    QUnit.test("Обрабатывает null и undefined", function(assert) {
        const template = "Null: {{nullValue}}, Undefined: {{undefinedValue}}";
        const data = { 
            nullValue: null,
        };
        const result = templateEngine(template, data);

        assert.equal(result, "Null: , Undefined: ");
    });

    QUnit.test("Обрабатывает пустой шаблон", function(assert) {
        const template = "";
        const data = { name: "Технопарк" };
        const result = templateEngine(template, data);

        assert.equal(result, "");
    });

    QUnit.test("Обрабатывает шаблон без переменных", function(assert) {
        const template = "Просто текст без переменных";
        const data = { name: "Технопарк" };
        const result = templateEngine(template, data);

        assert.equal(result, "Просто текст без переменных");
    });

    QUnit.test("Обрабатывает несколько переменных в шаблоне", function(assert) {
        const template = "{{greeting}}, {{name}}! Вам {{age}} лет.";
        const data = { greeting: "Здравствуйте", name: "Иван", age: 25 };
        const result = templateEngine(template, data);

        assert.equal(result, "Здравствуйте, Иван! Вам 25 лет.");
    });

    QUnit.test("Обрабатывает глубокую вложенность", function(assert) {
        const template = "Данные: {{a.b.c.d.e}}";
        const data = { a: { b: { c: { d: { e: "глубокое значение" } } } } };
        const result = templateEngine(template, data);

        assert.equal(result, "Данные: глубокое значение");
    });

    QUnit.test("Обрабатывает несуществующий путь", function(assert) {
        const template = "Значение: {{a.b.c.x}}";
        const data = { a: { b: { c: { d: "значение" } } } };
        const result = templateEngine(template, data);

        assert.equal(result, "Значение: ");
    });

    QUnit.test("Обрабатывает специальные символы в пути", function(assert) {
        const template = "Значение: {{user.full-name}}";
        const data = { user: { "full-name": "Иван Петров" } };
        const result = templateEngine(template, data);

        assert.equal(result, "Значение: Иван Петров");
    });

    QUnit.test("Проверяет тип данных на каждом уровне вложенности", function(assert) {
        const template = "Значение: {{user.profile.age}}";
        const data = { user: { profile: "не объект" } };
        const result = templateEngine(template, data);

        assert.equal(result, "Значение: ");
    });

    QUnit.test("Обрабатывает массив как значение", function(assert) {
        const template = "Массив: {{items}}";
        const data = { items: [1, 2, 3, 4, 5] };
        const result = templateEngine(template, data);

        assert.equal(result, "Массив: 1,2,3,4,5");
    });

    QUnit.test("Обрабатывает несколько выражений с разными типами данных", function(assert) {
        const template = "{{string}} - {{number}} - {{boolean}} - {{array}} - {{object.foo}}";
        const data = { 
            string: "текст",
            number: 123,
            boolean: false,
            array: [1, 2, 3],
            object: { foo: "bar" }
        };
        const result = templateEngine(template, data);

        assert.equal(result, "текст - 123 - false - 1,2,3 - bar");
    });

    QUnit.test("Бросает TypeError, если template не строка", function(assert) {
        const data = { name: "Технопарк" };

        assert.throws(
            function() {
                templateEngine(123, data);
            },
            TypeError
        );
    });

    QUnit.test("Бросает TypeError, если data не объект", function(assert) {
        const template = "Привет, {{name}}!";

        assert.throws(
            function() {
                templateEngine(template, null);
            },
            TypeError
        );

        assert.throws(
            function() {
                templateEngine(template, ["Технопарк"]);
            },
            TypeError
        );
    });
});
