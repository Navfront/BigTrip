# Проект «Большое путешествие»

Современный сервис для
настоящих путешественников. Сервис помогает детально
спланировать маршрут поездки, рассчитать стоимость
путешествия и получить информацию о
достопримечательностях. Минималистичный интерфейс не
даст повода отвлечься и сфокусирует внимание на
планировании путешествия.

---

## О проекте:

- [x] Архитектура MVP (Model-View-Presenter)
- [x] Сортировка и фильтрация данных
- [x] Npm пакеты: Chart.js и Dayjs и др.
- [x] Различные патерны проектирования: observer, adapter, proxy и тд.
- [x] Node Express Server залитый на Heroku
- [x] ESLint контролирует качество кода
- [x] Оффлайн режим с LocalStorage
- [x] Service Worker для кеширования

<br>

### Ссылка на gh-pages: https://navfront.github.io/BigTrip/

<br>

## Основные критерии качества:

- Б1. Код соответствует техническому заданию.

- Б2. При выполнении кода не возникает необработанных ошибок.

- Б3. Название переменных, параметров, свойств и
  методов начинается со строчной буквы и
  записываются в нотации lowerCamelCase.

- Б4. Для названия значений используются
  английские существительные.

- Б5. Названия констант (постоянных значений)
  написаны прописными (заглавными) буквами.
- Б6. Классы названы английскими
  существительными. Название класса начинается с
  заглавной буквы.
- Б7. Перечисления (Enum) названы английскими
  существительными и начинаются с прописной
  (заглавной) буквы.

- Б8. Массивы названы существительными во
  множественном числе.

- Б9. В названии переменных не используется тип
  данных.

- Б10. Название функции или метода содержит
  глагол.

- Б11. Названия файлов модулей записаны
  строчными (маленькими) буквами. Слова разделены
  дефисами.

- Б12. Неизменяемые значения объявлены
  через const.

- Б13. Изменяемые значения объявлены
  через let.

- Б14. Код всех JS-файлов соответствует
  рекомендованной структуре

- Б15. Код соответствует гайдлайнам.

- Б16. Сложные составные константы собираются в
  перечисления Enum.

- Б17. Приватные поля в классах помечены и не
  используются снаружи.

- Б19. Версии используемых зависимостей
  зафиксированы в package.json.

- Б20. В коде нет заранее недостижимых участков
  кода.

- Б21. Константы и перечисления нигде в коде не
  переопределяются.

- Б22. Используются строгие сравнения вместо
  нестрогих

- Б23. В коде не используются зарезервированные
  слова в качестве имён переменных и свойств.

- Б24. Отсутствуют потенциально некорректные
  операции

- Б25. Все файлы JS представляют собой отдельные
  модули ES2015.

- Б26. Модули не экспортируют изменяющиеся
  переменные.

- Б27. Название модуля соответствует его
  содержимому.

- Б28. Из одного модуля экспортируется не
  больше одного класса. Класс всегда экспортируется
  как default.

- Б29. Код является кроссбраузерным и не вызывает
  ошибок в разных браузерах и разных операционных
  системах

- Б30. Нельзя пользоваться глобальной
  переменной event.

- Б32. Своевременный выход из цикла: цикл не
  работает дольше, чем нужно.

- Б32. Своевременный выход из цикла: цикл не
  работает дольше, чем нужно.

- Б33. Внутри шаблонов-строк (template literals) не
  используется конкатенация строк.

- Б34. Количество вызовов циклов минимизировано.

- Б33. Внутри шаблонов-строк (template literals) не
  используется конкатенация строк.

- Б35. Множественные DOM-операции производятся
  на элементах, которые не добавлены в DOM.

- Б36. Обработчики события добавляются и
  удаляются своевременно.

- Б37. Запрещено вставлять в innerHTML и подобные
  ему свойства и методы строки, полученные снаружи
  (пользовательский ввод, данные сервера), без
  применения экранирования.

## Дополнительные критерии:

- Д1. Техническое задание реализовано в полном
  объёме.

- Д2. Переменные носят абстрактные названия и не
  содержат имён собственных.

- Д3. Название методов и свойств объектов не
  содержит название объектов.

- Д4. Из названия обработчика события и функции колбэка следует, что это за обработчик:

  - "on" + "на каком элементе" + "что случилось"
  - "на каком элементе" + "что случилось" + "Handler"

- Д5. Все функции объявлены единообразно.

- Д6. Используется единый стиль именования
  переменных.

- Д7. При использовании встроенного API, который
  поддерживает несколько вариантов использования,
  используется один способ.

- Д8. Методы внутри классов упорядочены.

- Д9. В случае, если одинаковый код повторяется в
  нескольких модулях, повторяющаяся часть
  вынесена в отдельный модуль.

- Д10. В проекте не должно быть избыточных
  проверок.

- Д11. Отсутствует дублирование кода:
  повторяющиеся части кода переписаны как функции
  или вынесены из условий.

- Д12. Если при использовании условного оператора в
  любом случае возвращается значение,
  альтернативная ветка опускается.

- Д13. Отсутствуют лишние приведения и проверки
  типов.

- Д14. Там, где возможно, в присвоении значения
  вместо if используется тернарный оператор.

- Д15. Условия упрощены.

- Д16. Значения не конвертируются в строку и
  обратно без необходимости.

- Д17. Константы, используемые внутри функций,
  создаются вне функций и используются повторно
  через замыкания.

- Д18. Поиск элементов по селекторам делается
  минимальное количество раз, после этого ссылки на
  элементы сохраняются.

- Д19. Массивы и объекты, содержимое которых
  вычисляется, собираются один раз, а после этого
  только переиспользуются.

- Д20. Для итерирования по массивам и структурам
  данных, по которому можно итерироваться
  ( `Iterable` ), используется конструкция `for .. of`

- Д21. Изменения применяются точечно

- Д22. Для каждого события используется отдельный
  обработчик.

- Д23. Длинные функции и методы разбиты на
  несколько небольших.

- Д24. Для работы с JS-коллекциями используются
  итераторы для массивов.

- Д25. Оператор присваивания не используется как
  часть выражения

- Д26. Операции над DOM-элементами
  инкапсулированы.
