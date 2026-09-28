/* Serikov Coffee — карта подключений.
   Все тексты лежат в блоках данных ниже: правьте их, разметку трогать не нужно. */

(function () {
  'use strict';

  /* ======================= карта: шесть узлов ======================= */

  var BRANCHES = {
    site: {
      idx: '01',
      title: 'Сайт: события и товарный фид',
      why: 'Всё остальное питается отсюда. Пока сайт не рассказывает, что на нём происходит, и не отдаёт список товаров, подключать площадки не к чему.',
      gives: 'Настраиваем один раз на сайте — данные подходят сразу Google, Яндексу и Facebook.',
      items: [
        ['no', 'Слой данных: просмотр товара, корзина, оформление, оплата'],
        ['no', 'Событие покупки с суммой и составом заказа'],
        ['no', 'Страница «Спасибо за заказ» как точка учёта'],
        ['no', 'Товарный фид на 212 товаров, обновление раз в сутки'],
        ['no', 'Микроразметка товара: цена и наличие'],
        ['yes', 'Оформление и оплата на одной странице уже работают']
      ]
    },
    google: {
      idx: '02',
      title: 'Google',
      why: 'Google закрывает сразу два источника: бесплатный поиск с карточками товаров и платную рекламу с оплатой за результат.',
      gives: 'Видно, по каким запросам нас находят и сколько стоит заказ из поиска.',
      items: [
        ['no', 'Диспетчер тегов: один контейнер для всех счётчиков'],
        ['no', 'Google Analytics 4 с электронной торговлей'],
        ['no', 'Search Console: запросы, ошибки, контроль переезда'],
        ['no', 'Merchant Center и товарный фид'],
        ['no', 'Google Ads: тег конверсий и ремаркетинг'],
        ['part', 'Карточки точек на Google Картах — проверить и заявить'],
        ['no', 'Отчёт в Looker Studio на один экран']
      ]
    },
    yandex: {
      idx: '03',
      title: 'Яндекс',
      why: 'Метрика показывает поведение подробнее любого другого счётчика: запись экрана, карты кликов и скроллов. Директ и Карты — отдельный источник заказов в Казахстане.',
      gives: 'Понятно, где люди спотыкаются на сайте, и появляется второй платный канал.',
      items: [
        ['no', 'Метрика: цели, электронная торговля, Вебвизор'],
        ['no', 'Вебмастер: индексация и переобход после переезда'],
        ['no', 'Директ: поиск, сети, ретаргетинг по сегментам'],
        ['part', 'Карточки на Яндекс Картах — проверить и заявить'],
        ['no', 'Аудитории: сегменты по базе 7 894 и похожие'],
        ['yes', 'Яндекс Доставка уже подключена как служба']
      ]
    },
    meta: {
      idx: '04',
      title: 'Facebook и Instagram',
      why: 'Здесь и трафик, и витрина: у бренда появляется магазин с товарами, а каждая карточка ведёт в наш каталог на сайте.',
      gives: 'Реклама учится на покупках, а товары показываются людям прямо в ленте.',
      items: [
        ['part', 'Пиксель есть, но молчит с 24 сентября — ставим на новый сайт'],
        ['no', 'События покупки и корзины с суммой'],
        ['no', 'Серверная передача событий (Conversions API)'],
        ['no', 'Верификация домена serikovcoffee.kz'],
        ['no', 'Каталог на 212 товаров из фида'],
        ['no', 'Магазин в Commerce Manager и отметки товаров в Instagram'],
        ['no', 'Аудитории и динамическая реклама каталога']
      ]
    },
    crm: {
      idx: '05',
      title: 'CRM и сквозная аналитика',
      why: 'Площадки считают клики и корзины, а деньги живут в CRM. Связка нужна, чтобы отличать дорогой трафик от дорогих заказов.',
      gives: 'Видно, какая реклама принесла оплаченные деньги, а не просто визиты.',
      items: [
        ['no', 'UTM-метки на всех ссылках, рассылках и QR в кофейнях'],
        ['no', 'Передача источника в сделку Битрикс24'],
        ['no', 'Сквозная аналитика: канал → заказ → сумма'],
        ['yes', 'Заказы сайта уже создают сделки с ответственным'],
        ['yes', 'База 7 894 клиента готова для сегментов и аудиторий']
      ]
    },
    report: {
      idx: '06',
      title: 'Отчётность',
      why: 'Чтобы разговор о бюджете был арифметикой, а не спором: сколько потратили, сколько заказов, по какой цене.',
      gives: 'Один экран, на который можно смотреть раз в неделю и раз в месяц.',
      items: [
        ['no', 'Дашборд: заказы, выручка, цена заказа по каналам'],
        ['no', 'Ежемесячный отчёт руководителю'],
        ['no', 'Еженедельная сводка по кампаниям'],
        ['no', 'План-факт по цене заказа']
      ]
    }
  };

  /* ======================= площадки ======================= */

  var PLATFORMS = {
    google: [
      ['no', 'Диспетчер тегов (Google Tag Manager)',
        'Один контейнер на сайте, через который ставятся все счётчики и пиксели. Дальше новые инструменты подключаются без правок кода.',
        ['Контейнер на serikovcoffee.kz', 'Слой данных с товарами и заказами', 'Переменные, триггеры, публикация']],
      ['no', 'Google Analytics 4',
        'Воронка целиком: откуда пришли, что смотрели, где ушли, сколько денег принесли. Основа всех отчётов.',
        ['Ресурс и поток данных', 'События: просмотр товара, корзина, оформление, покупка с суммой', 'Связка с Google Ads', 'Отчёты по каналам и товарам']],
      ['no', 'Search Console',
        'Поисковые запросы, по которым нас находят, и ошибки индексации. После переезда особенно важно: 192 адреса переехали со старого сайта.',
        ['Подтверждение прав на домен', 'Отправка карты сайта', 'Проверка старых адресов и редиректов', 'Отчёт по запросам и позициям']],
      ['no', 'Товарный фид',
        'Файл со всеми 212 товарами: цена, наличие, фото, ссылка. Из него живут и Merchant Center, и ремаркетинг, и Facebook.',
        ['Выгрузка из Битрикса', 'Поля: название, описание, цена, наличие, ссылка, фото, бренд, категория', 'Обновление раз в сутки', 'Контроль ошибок в товарах']],
      ['no', 'Merchant Center',
        'Карточки товаров с ценой и фото в поиске и во вкладке «Покупки», плюс товарные кампании.',
        ['Аккаунт на компанию', 'Загрузка фида и подтверждение сайта', 'Правила доставки и возврата', 'Проверим доступность товарных форматов для Казахстана при подключении']],
      ['no', 'Google Ads',
        'Поиск по брендовым и товарным запросам, ремаркетинг на тех, кто был на сайте, и Performance Max, когда накопятся конверсии.',
        ['Тег конверсий на оплаченный заказ', 'Импорт целей из GA4', 'Аудитории ремаркетинга', 'Кампании после первых данных']],
      ['part', 'Google Карты (профиль компании)',
        'Бесплатные заходы из локального поиска: человек ищет «кофе рядом» и видит нашу точку с фото, часами и ссылкой на сайт.',
        ['Заявить и подтвердить карточки точек', 'Часы, рубрики, 15–20 фото', 'Ссылка на сайт с меткой', 'Ответы на отзывы в течение суток']],
      ['no', 'Looker Studio',
        'Отчёт на один экран вместо выгрузок: заказы, выручка, цена заказа, окупаемость по каналам.',
        ['Подключение GA4, Ads и выгрузки заказов', 'Сборка дашборда', 'Доступ руководителю']]
    ],
    yandex: [
      ['no', 'Яндекс Метрика',
        'Самый подробный счётчик: запись экрана посетителя, карты кликов и скроллов, отчёты по источникам. Видно не только сколько ушло, но и на чём.',
        ['Счётчик на все страницы', 'Цели: корзина, оформление, оплата', 'Электронная торговля с составом заказа', 'Фильтр внутренних визитов']],
      ['no', 'Яндекс Вебмастер',
        'Индексация, ошибки и переобход страниц после переезда на новый домен.',
        ['Подтверждение прав', 'Карта сайта', 'Переобход старых адресов', 'Мониторинг ошибок']],
      ['no', 'Яндекс Директ',
        'Второй платный канал: поиск и сети. В Казахстане даёт заметную долю трафика, особенно на десктопе.',
        ['Связка с Метрикой и цели как конверсии', 'Ретаргетинг по сегментам Метрики', 'Товарный фид для смарт-баннеров', 'Запуск после теста Facebook']],
      ['part', 'Яндекс Бизнес и Карты',
        'Точки на Картах с маршрутом, часами и отзывами. Люди ищут кофейни именно здесь.',
        ['Подтвердить карточки точек', 'Часы, фото, рубрики', 'Ссылка на сайт с меткой', 'Регламент ответов на отзывы']],
      ['no', 'Яндекс Аудитории',
        'Загружаем нашу базу клиентов и получаем сегменты и похожие аудитории для Директа.',
        ['Выгрузка телефонов и почт из базы 7 894', 'Сегменты: покупатели, давно не покупали', 'Похожие аудитории']],
      ['yes', 'Яндекс Доставка',
        'Уже подключена: курьер за час внутри города, цена считается по адресу.',
        ['Работает, трогать не нужно', 'Позже: статусы доставки в общий отчёт']]
    ],
    meta: [
      ['part', 'Пиксель на новый сайт',
        'В кабинете живёт пиксель с историей, но его последнее событие — 24 сентября, день переезда. Ставим этот же, а не новый: так сохраняется накопленное.',
        ['Пиксель «CoffeeOnline» на serikovcoffee.kz', 'Базовые события и проверка в Events Manager', 'Отключить лишние пиксели, чтобы не путаться']],
      ['no', 'События покупки и корзины',
        'Реклама должна учиться на покупках, а не на кликах. Для этого ей нужно сообщать, что произошло и на какую сумму.',
        ['Просмотр товара, добавление в корзину, начало оформления, покупка', 'Сумма заказа и id товаров', 'Проверка качества событий в кабинете']],
      ['no', 'Серверная передача событий (Conversions API)',
        'Блокировщики рекламы и настройки iPhone съедают часть событий. Серверная отправка возвращает их.',
        ['Отправка событий с сервера Битрикса', 'Дедупликация с пикселем', 'Контроль совпадения событий']],
      ['no', 'Верификация домена',
        'Подтверждение, что serikovcoffee.kz принадлежит нам. Без неё не включат магазин и не будет приоритета событий.',
        ['Мета-тег или запись в DNS', 'Привязка домена к бизнес-менеджеру']],
      ['no', 'Товарный фид для каталога',
        'Тот же файл, что и для Google: 212 товаров с ценой, наличием, фото и ссылкой на карточку сайта.',
        ['Выгрузка из Битрикса в XML или CSV', 'Обновление раз в сутки, чтобы не висели проданные позиции', 'Проверка ошибок и картинок']],
      ['no', 'Каталог товаров',
        'Сейчас в кабинете два каталога «Новогодние подарки» без товаров магазина. Нужен новый, живой.',
        ['Создать каталог и подключить фид', 'Связать каталог с пикселем', 'Наборы товаров: обжарка, дрипы, аксессуары']],
      ['no', 'Магазин в Commerce Manager',
        'Витрина в Facebook и Instagram. Способ оформления — «на сайте»: покупатель нажимает карточку и попадает на страницу товара в нашем магазине, оплата проходит там же, через наш терминал.',
        ['Создать магазин и подключить каталог', 'Оформление — на сайте', 'Пройти модерацию', 'Проверить ссылки карточек']],
      ['no', 'Отметки товаров в Instagram',
        'Вкладка с товарами в профиле, отметки в постах и сторис — каждая ведёт на карточку сайта.',
        ['Связать аккаунт Instagram с каталогом', 'Дождаться проверки', 'Отмечать товары в публикациях']],
      ['no', 'Аудитории',
        'Из событий и базы собираются списки людей, которым реклама показывается дешевле всего.',
        ['Посетители сайта, просмотр товара, брошенная корзина, покупатели', 'Загрузка базы 7 894 клиентов', 'Похожие аудитории по покупателям']],
      ['no', 'Динамическая реклама каталога',
        'Автоматически показывает человеку тот кофе, который он смотрел, и похожие позиции.',
        ['Кампания на каталог', 'Наборы товаров под аудитории', 'Запуск после накопления событий']]
    ]
  };

  var SHOP = [
    ['Фид с сайта', 'Выгружаем 212 товаров с ценой, наличием, фото и ссылкой. Файл обновляется раз в сутки, чтобы в магазине не висели проданные позиции.'],
    ['Каталог в кабинете', 'Создаём новый каталог вместо двух старых «Новогодних подарков» и подключаем к нему фид — товары появляются в бизнес-менеджере.'],
    ['Верификация домена', 'Подтверждаем, что serikovcoffee.kz наш. Без этого шага магазин не включат.'],
    ['Магазин и витрина', 'В Commerce Manager собираем магазин со способом оформления «на сайте»: карточка в Instagram или Facebook открывает товар в нашем каталоге.'],
    ['Отметки товаров', 'В профиле появляется вкладка с товарами, в постах и сторис — отметки. Каждая ведёт на страницу товара, оплата проходит на сайте.']
  ];

  var FB = [
    ['warn', 'Рекламные аккаунты', 'Три штуки: CoffeeOnline с привязанной оплатой, «SC — Рекламный аккаунт» без оплаты и ещё один в другом бизнес-менеджере.', 'Работаем в <b>одном</b> — CoffeeOnline. Остальные в архив.'],
    ['warn', 'Бизнес-менеджеры', 'Два: «Serikov Coffee Company» и «Serikov Coffee». Активы разъехались между ними.', 'Оставляем <b>один</b>, переносим страницу, пиксель и каталог.'],
    ['ok', 'Страница бренда', 'Serikov Coffee Company — на месте и привязана к кабинету.', 'Ничего делать не нужно.'],
    ['bad', 'Пиксели', 'Шесть штук. Живой один — «Пиксель аккаунта CoffeeOnline», последнее событие 24 сентября, в день переезда сайта.', 'Ставим его на новый сайт. <b>Аудитории живут 180 дней</b> — дальше данные протухнут.'],
    ['bad', 'Каталог товаров', 'Два каталога, оба называются «Новогодние подарки». Товаров магазина в них нет.', 'Новый каталог из фида сайта на <b>212 товаров</b>.'],
    ['bad', 'События покупки', 'Сайт не передаёт в Meta ни просмотр товара, ни корзину, ни оплату.', 'Пиксель плюс <b>серверные события</b> с суммой заказа.']
  ];

  var TRACKS = {
    a: [
      ['Неделя 1', 'Сайт и счётчики', 'Слой данных на сайте, диспетчер тегов, Яндекс Метрика и пиксель Meta. Базовые события начинают собираться.'],
      ['Неделя 2', 'Покупки и поисковые кабинеты', 'Событие покупки с суммой и составом заказа, Google Analytics 4, Search Console и Вебмастер.'],
      ['Неделя 3', 'Фид и каталоги', 'Выгрузка 212 товаров, каталог в Facebook, Merchant Center, верификация домена.'],
      ['Неделя 4', 'Магазин и сквозная аналитика', 'Магазин в Commerce Manager и отметки в Instagram. UTM на всех ссылках и передача источника в CRM.'],
      ['Месяц 2', 'Отчётность', 'Дашборд и первый отчёт: заказы, выручка и цена заказа по каждому каналу.']
    ],
    b: [
      ['Неделя 1', 'Порядок в кабинете и тёплая аудитория', 'Один бизнес-менеджер и один аккаунт, пиксель на сайте, первая кампания на посетителей сайта и базу клиентов.'],
      ['Неделя 2', 'Гипотезы по интересам', 'Три-четыре связки «аудитория + оффер + креатив» на малом бюджете. Смотрим цену клика и добавления в корзину.'],
      ['Неделя 3', 'Ретаргет', 'Возвращаем тех, кто смотрел товар и не купил. Обычно это самый дешёвый заказ в кабинете.'],
      ['Неделя 4', 'Похожие аудитории', 'Look-alike по покупателям и по базе 7 894 клиентов. Выключаем связки, которые не сработали.'],
      ['Месяц 2', 'Динамическая реклама каталога', 'Товары догоняют тех, кто их смотрел. Считаем цену заказа и решаем, что масштабировать.']
    ]
  };

  /* ======================= вспомогательное ======================= */

  var root = document.documentElement;
  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function num(n) { return String(Math.round(n)).replace(/\B(?=(\d{3})+(?!\d))/g, ' '); }

  function chip(kind) {
    var text = kind === 'yes' ? 'есть' : (kind === 'part' ? 'частично' : 'нет');
    return '<span class="chip ' + kind + '">' + text + '</span>';
  }

  /* ======================= тема ======================= */

  var themeBtn = document.getElementById('theme');
  var saved = null;
  try { saved = localStorage.getItem('sc-theme'); } catch (e) { saved = null; }
  if (saved === 'dark' || saved === 'light') root.setAttribute('data-theme', saved);

  if (themeBtn) {
    themeBtn.addEventListener('click', function () {
      var dark = root.getAttribute('data-theme') === 'dark' ||
        (!root.hasAttribute('data-theme') && window.matchMedia('(prefers-color-scheme: dark)').matches);
      var next = dark ? 'light' : 'dark';
      root.setAttribute('data-theme', next);
      try { localStorage.setItem('sc-theme', next); } catch (e) { /* приватное окно */ }
    });
  }

  /* ======================= карта подключений ======================= */

  var stage = document.getElementById('stage');
  var svg = document.getElementById('links');
  var detail = document.getElementById('detail');
  var nodes = stage ? [].slice.call(stage.querySelectorAll('.node')) : [];
  var lines = [];

  function renderDetail(key) {
    var b = BRANCHES[key];
    if (!b || !detail) return;
    var html =
      '<div class="detail-head"><span class="tag">Узел ' + b.idx + '</span><h3>' + b.title + '</h3></div>' +
      '<p class="why">' + b.why + '</p><ul class="items">';
    b.items.forEach(function (it, i) {
      var delay = reduced ? 0 : Math.min(i * 45, 400);
      html += '<li style="animation-delay:' + delay + 'ms">' + chip(it[0]) + '<span>' + it[1] + '</span></li>';
    });
    html += '</ul><p class="gives"><b>Что это даёт:</b> ' + b.gives + '</p>';
    detail.innerHTML = html;
  }

  nodes.forEach(function (n) {
    n.addEventListener('click', function () {
      nodes.forEach(function (x) { x.classList.toggle('on', x === n); });
      lines.forEach(function (l) { l.classList.toggle('on', l.dataset.key === n.dataset.key); });
      renderDetail(n.dataset.key);
    });
  });
  renderDetail('site');

  function drawLines() {
    if (!stage || !svg) return;
    var wide = window.matchMedia('(min-width: 901px)').matches;
    svg.innerHTML = '';
    lines = [];
    if (!wide) return;

    var box = stage.getBoundingClientRect();
    var core = stage.querySelector('.core').getBoundingClientRect();
    var cx = core.left - box.left + core.width / 2;
    var cy = core.top - box.top + core.height / 2;
    svg.setAttribute('viewBox', '0 0 ' + Math.round(box.width) + ' ' + Math.round(box.height));

    nodes.forEach(function (n, i) {
      var r = n.getBoundingClientRect();
      var nx = r.left - box.left + r.width / 2;
      var ny = r.top - box.top + r.height / 2;
      var line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
      line.setAttribute('x1', cx);
      line.setAttribute('y1', cy);
      line.setAttribute('x2', nx);
      line.setAttribute('y2', ny);
      line.dataset.key = n.dataset.key;
      if (n.classList.contains('on')) line.classList.add('on');
      svg.appendChild(line);
      lines.push(line);

      if (!reduced) {
        var len = Math.sqrt(Math.pow(nx - cx, 2) + Math.pow(ny - cy, 2));
        line.style.strokeDasharray = len;
        line.style.strokeDashoffset = len;
        line.style.transition = 'stroke-dashoffset .9s ' + (120 + i * 90) + 'ms cubic-bezier(.22,1,.36,1), stroke .3s, stroke-width .3s';
        requestAnimationFrame(function () {
          requestAnimationFrame(function () { line.style.strokeDashoffset = '0'; });
        });
      }
    });
  }

  if (stage) {
    drawLines();
    window.addEventListener('resize', function () {
      clearTimeout(drawLines._t);
      drawLines._t = setTimeout(drawLines, 160);
    });
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(drawLines);
  }

  /* ======================= треки ======================= */

  var trackHost = document.getElementById('track');
  var tabBtns = [].slice.call(document.querySelectorAll('.tab-btn'));

  function renderTrack(key) {
    if (!trackHost) return;
    trackHost.className = 'track ' + key;
    trackHost.innerHTML = TRACKS[key].map(function (w, i) {
      var delay = reduced ? 0 : i * 60;
      return '<div class="wk" style="animation-delay:' + delay + 'ms">' +
        '<div class="when">' + w[0] + '</div>' +
        '<div><h4>' + w[1] + '</h4><p>' + w[2] + '</p></div></div>';
    }).join('');
  }

  tabBtns.forEach(function (b) {
    b.addEventListener('click', function () {
      tabBtns.forEach(function (x) {
        var on = x === b;
        x.classList.toggle('on', on);
        x.setAttribute('aria-selected', on ? 'true' : 'false');
      });
      renderTrack(b.dataset.track);
    });
  });
  renderTrack('a');

  /* ======================= карточки площадок ======================= */

  function renderPlatform(hostId, rows) {
    var host = document.getElementById(hostId);
    if (!host) return;
    host.innerHTML = rows.map(function (r, i) {
      var n = i + 1 < 10 ? '0' + (i + 1) : String(i + 1);
      return '<article class="pcard">' +
        '<div class="pcard-top"><span class="pnum">' + n + '</span><h3>' + r[1] + '</h3>' + chip(r[0]) + '</div>' +
        '<p class="gain">' + r[2] + '</p>' +
        '<ul class="need-list">' + r[3].map(function (s) { return '<li>' + s + '</li>'; }).join('') + '</ul>' +
        '</article>';
    }).join('');
  }

  renderPlatform('platGoogle', PLATFORMS.google);
  renderPlatform('platYandex', PLATFORMS.yandex);
  renderPlatform('platMeta', PLATFORMS.meta);

  /* ======================= магазин в Facebook ======================= */

  var shopHost = document.getElementById('shop');
  if (shopHost) {
    shopHost.innerHTML = SHOP.map(function (s, i) {
      return '<div class="flow-step"><b>' + (i + 1) + '. ' + s[0] + '</b>' + s[1] + '</div>';
    }).join('');
  }

  /* ======================= что есть в кабинете ======================= */

  var fbHost = document.getElementById('fbGrid');
  if (fbHost) {
    fbHost.innerHTML = FB.map(function (c) {
      return '<div class="fb-card ' + (c[0] === 'ok' ? '' : c[0]) + '">' +
        '<div class="row"><span class="dot"></span><h4>' + c[1] + '</h4></div>' +
        '<p class="val">' + c[2] + '</p>' +
        '<p class="act">' + c[3] + '</p></div>';
    }).join('');
  }

  /* ======================= счётчики и появление ======================= */

  function countUp(el) {
    var target = parseInt(el.dataset.count, 10);
    if (!target || reduced) return;
    var dur = 1100;
    var start = null;
    function step(ts) {
      if (start === null) start = ts;
      var p = Math.min((ts - start) / dur, 1);
      var eased = 1 - Math.pow(1 - p, 3);
      el.textContent = num(target * eased);
      if (p < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }

  var revealables = [].slice.call(document.querySelectorAll('.reveal'));

  function show(el) {
    el.classList.add('in');
    [].slice.call(el.querySelectorAll('[data-count]')).forEach(countUp);
    if (el.matches('[data-count]')) countUp(el);
  }

  function sweep() {
    var h = window.innerHeight;
    revealables.forEach(function (el) {
      if (el.classList.contains('in')) return;
      var box = el.getBoundingClientRect();
      if (box.top < h * 1.05 && box.bottom > -h * 0.2) show(el);
    });
  }

  if (!('IntersectionObserver' in window)) {
    revealables.forEach(show);
  } else {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { show(e.target); io.unobserve(e.target); }
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });

    revealables.forEach(function (el, i) {
      var box = el.getBoundingClientRect();
      if (box.top < window.innerHeight) {
        setTimeout(function () { show(el); }, reduced ? 0 : Math.min(i * 80, 500));
      } else {
        io.observe(el);
      }
    });

    // страховки: переход по якорю, прокрутка, медленная загрузка шрифтов
    ['scroll', 'hashchange', 'resize'].forEach(function (ev) {
      window.addEventListener(ev, function () {
        clearTimeout(sweep._t);
        sweep._t = setTimeout(sweep, 60);
      }, { passive: true });
    });
    window.addEventListener('load', sweep);
    setTimeout(sweep, 600);
    setTimeout(function () { revealables.forEach(show); }, 4000);
  }
})();
