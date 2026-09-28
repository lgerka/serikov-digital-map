/* Serikov Coffee — карта развития digital.
   Все тексты лежат в блоках данных ниже: правьте их, разметку трогать не нужно. */

(function () {
  'use strict';

  /* ======================= данные ======================= */

  var BRANCHES = {
    analytics: {
      idx: '01',
      title: 'Аналитика и данные',
      why: 'Сейчас на сайте нет ни одного счётчика: заказ приходит, и мы не знаем, из какого канала он пришёл и сколько стоил.',
      gives: 'Видно, какой канал приносит оплаченные заказы, и можно отключать то, что не окупается.',
      items: [
        ['no', 'Яндекс Метрика: цели, Вебвизор, карта кликов'],
        ['no', 'Google Analytics 4: события и электронная торговля'],
        ['no', 'Сквозная аналитика в Битрикс24 по UTM'],
        ['no', 'UTM-метки на все ссылки и QR в кофейнях'],
        ['no', 'Search Console и Яндекс Вебмастер'],
        ['no', 'Отчёт раз в месяц: заказы, выручка, стоимость покупателя']
      ]
    },
    pixels: {
      idx: '02',
      title: 'Пиксели и аудитории',
      why: 'Пиксель Meta в кабинете есть, но последнее событие — 24 сентября, в день переезда сайта. На новом сайте его нет, аудитории перестали пополняться.',
      gives: 'Реклама учится на наших покупателях, а не на случайных людях.',
      items: [
        ['part', 'Пиксель Meta существует, но молчит с 24 сентября'],
        ['no', 'Серверная передача событий (Conversions API)'],
        ['no', 'TikTok Pixel и Events API'],
        ['no', 'Тег Google Ads с конверсией по оплаченному заказу'],
        ['no', 'Аудитории: смотрели товар, бросили корзину, купили'],
        ['yes', 'База 7 894 клиента — готовая основа для похожих аудиторий']
      ]
    },
    ads: {
      idx: '03',
      title: 'Реклама и трафик',
      why: 'Первый бюджет идёт на тёплых: тех, кто уже был на сайте или похож на наших покупателей. Холодные интересы — следующим шагом.',
      gives: 'Управляемый поток заказов с понятной ценой покупателя.',
      items: [
        ['part', 'Кабинет и страница есть, кампаний по магазину нет'],
        ['no', 'Ретаргет на тех, кто смотрел товар и не купил'],
        ['no', 'Похожие аудитории по покупателям'],
        ['no', 'Интересы как гипотезы: кофе, завтраки, бег, товары для дома'],
        ['no', 'Каталог товаров и динамическая реклама'],
        ['no', 'Google Поиск: «купить кофе в зёрнах» и брендовые запросы']
      ]
    },
    seo: {
      idx: '04',
      title: 'SEO и гео',
      why: 'Поиск и карты дают заказы без оплаты за клик, но сейчас сайт отдаёт поисковику меньше, чем мог бы.',
      gives: 'Бесплатный поток из поиска и карт в трёх городах.',
      items: [
        ['no', 'Микроразметка товара: цена, наличие, рейтинг'],
        ['no', 'Описания карточек — сейчас их нет ни у одного товара'],
        ['no', 'Понятные адреса товаров вместо /catalog/coffee/1443/'],
        ['no', 'Указание главной страницы против дублей сортировок'],
        ['no', 'Карточки в 2ГИС, Яндекс и Google Картах: часы, фото, отзывы'],
        ['no', 'Страницы под города: Караганда, Алматы, Астана'],
        ['yes', 'Заголовки и описания разделов написаны по-человечески'],
        ['yes', 'Своя карта сайта на 138 адресов и 192 редиректа со старого сайта']
      ]
    },
    conv: {
      idx: '05',
      title: 'Конверсия сайта',
      why: 'Эти доработки поднимают выручку с людей, которые уже пришли. Дешевле, чем покупать новый трафик.',
      gives: 'Больше заказов с того же трафика и повторные покупки.',
      items: [
        ['no', 'Страница «Спасибо за заказ» — сейчас английская заглушка Битрикса'],
        ['no', 'Отзывы с фото и модерацией'],
        ['no', 'Награда за отзыв: за отзыв, фото и пробу нового вкуса'],
        ['no', 'Брошенная корзина: письмо и WhatsApp через два часа'],
        ['no', 'Письма по базе: новые лоты, возврат, ранний доступ'],
        ['yes', 'Оформление и оплата на одной странице, скидочные ступени работают']
      ]
    },
    speed: {
      idx: '06',
      title: 'Скорость и техника',
      why: 'Сервер отвечает за 0,1 секунды — тормозит сама страница: 64 отдельных файла и тяжёлые картинки.',
      gives: 'Дешевле клик в рекламе и меньше потерь на телефонах.',
      items: [
        ['no', 'Собрать 36 файлов стилей и 28 скриптов в один'],
        ['part', 'Картинки: перевести всё в webp и включить отложенную загрузку'],
        ['part', 'Главная весит 2,1 МБ и делает 116 запросов'],
        ['no', 'Прогрев кеша: первое открытие после сброса — до 5 секунд'],
        ['yes', 'Сжатие gzip и HTTP/2 уже работают'],
        ['yes', 'Мобильная версия сделана отдельным слоем']
      ]
    }
  };

  var FINDINGS = [
    ['crit', 'Критично', 'Нет микроразметки товаров',
      'Google и Яндекс не видят цену, наличие и рейтинг — в выдаче наша карточка выглядит беднее, чем у конкурентов.',
      'Добавляю разметку товара, цены, наличия и хлебных крошек в шаблон карточки.'],
    ['crit', 'Критично', 'У карточек товара нет описаний',
      'Поисковик сам придумывает текст под ссылкой — получается случайный кусок страницы вместо продающей строки.',
      'Ставлю шаблон описания по свойствам товара: сорт, обжарка, вкус, вес, город.'],
    ['crit', 'Критично', 'Сайт не подтверждён в Search Console и Вебмастере',
      'Мы не видим поисковые запросы, ошибки индексации и потерянные страницы после переезда.',
      'Подтверждаю права, отправляю карту сайта, слежу за ошибками после переезда.'],
    ['imp', 'Важно', 'Адреса товаров состоят из цифр',
      'Ссылка вида /catalog/coffee/1443/ не содержит слов, по которым ищут кофе, и хуже кликается в выдаче.',
      'Перевожу карточки на адреса из названия с сохранением старых ссылок через редиректы.'],
    ['imp', 'Важно', 'Нет указания главной страницы (canonical)',
      'Сортировки и страницы каталога открываются как отдельные адреса с тем же содержимым — это дубли.',
      'Добавляю canonical на карточки и разделы, закрываю служебные параметры.'],
    ['imp', 'Важно', 'Картинка для соцсетей одна на весь сайт',
      'Когда ссылку на кофе кидают в WhatsApp или Instagram, вместо пачки показывается общий баннер.',
      'Ставлю фото товара в разметку Open Graph для карточек и разделов.'],
    ['low', 'Мелочь', 'Старые страницы оплаты открыты',
      'Английские заглушки Битрикса отвечают как обычные страницы и ведут на несуществующий раздел.',
      'Убираю их и оставляю одну свою страницу после оплаты.']
  ];

  var OBJECTIONS = [
    ['low', 'Возражение', 'Instagram — это же тоже интернет, значит твоя зона',
      'Канал действительно цифровой, но профессия другая. В аккаунте живёт производство контента и общение с подписчиками, у меня — реклама, сайт, аналитика и деньги.',
      'Делим по результату: у контента — охват, вовлечение, подписчики; у меня — заказы, цена заказа, выручка.'],
    ['low', 'Возражение', 'Ты маркетолог — придумай идеи для съёмок',
      'Идею под рекламу я даю всегда: какая аудитория, какой оффер, какой формат и что должно быть в кадре. Дальше начинается производство.',
      'Сценарий, съёмка, монтаж и публикация — контент-направление. Я ставлю готовый ролик в кампанию и показываю, сколько он принёс.'],
    ['low', 'Возражение', 'Зачем аналитика, если заказы и так идут',
      'Шестнадцать заказов за четыре дня пришли неизвестно откуда. Мы не можем повторить то, что сработало, потому что не знаем, что именно сработало.',
      'Счётчики и события — это как касса с учётом: без них любой рекламный бюджет тратится вслепую.'],
    ['low', 'Возражение', 'Давай сначала запустим рекламу, остальное потом',
      'Так и делаем — тест на Facebook идёт параллельно с настройкой. Но пиксель и событие покупки ставим до первого запуска.',
      'Иначе деньги потрачены, а данных нет: реклама не обучится, аудитории не соберутся, и второй запуск начнётся с нуля.'],
    ['low', 'Возражение', 'Дешевле нанять таргетолога за фиксированную сумму',
      'Таргетолог отвечает за клики в кабинете. За то, что происходит после клика — сайт, карточка, оформление, оплата, CRM, повторные покупки — не отвечает никто.',
      'Эти деньги теряются тише всего: трафик куплен, а заказа нет, и все стороны считают, что виноват кто-то другой.'],
    ['low', 'Возражение', 'Контент бесплатный, а реклама дорогая',
      'Контент тоже стоит денег: время, съёмка, монтаж, реквизит. Просто эта стоимость не приходит счётом от площадки.',
      'Зато у рекламы есть то, чего у контента нет: цена заказа. Её можно считать, улучшать и на неё можно опираться в решениях.']
  ];

  var TRACKS = {
    a: [
      ['Неделя 1', 'Порядок и счётчики', 'Выбираем один рекламный аккаунт и один пиксель. Ставим пиксель Meta и Яндекс Метрику на сайт, включаем базовые события.'],
      ['Неделя 2', 'События и GA4', 'Просмотр товара, корзина, оформление и покупка — с суммой заказа. Подключаем Google Analytics 4, Search Console и Вебмастер.'],
      ['Неделя 3', 'Страница «Спасибо» и серверные события', 'Своя страница после оплаты. Событие покупки уходит и из браузера, и напрямую с сервера, чтобы не терять до трети конверсий.'],
      ['Неделя 4', 'Сквозная аналитика', 'UTM на всех ссылках и связка с Битрикс24: видно, из какого канала пришёл каждый оплаченный заказ.'],
      ['Месяц 2', 'Отчётность', 'Первый отчёт: посетители, заказы, выручка, цена заказа и окупаемость по каждому каналу.']
    ],
    b: [
      ['Неделя 1', 'Каталог и первая кампания', 'Фид из Битрикса, новый каталог в бизнес-менеджере. Первая кампания на тёплых: посетители сайта и база клиентов.'],
      ['Неделя 2', 'Гипотезы по интересам', 'Три-четыре связки «аудитория + оффер + креатив» на малом бюджете. Смотрим цену клика и добавления в корзину.'],
      ['Неделя 3', 'Ретаргет', 'Возвращаем тех, кто смотрел товар и не купил. Обычно это самый дешёвый заказ в кабинете.'],
      ['Неделя 4', 'Похожие аудитории', 'Look-alike по покупателям и по базе 7 894 клиентов. Выключаем связки, которые не сработали.'],
      ['Месяц 2', 'Динамическая реклама', 'Товары из каталога догоняют тех, кто их смотрел. Считаем цену заказа и решаем, что масштабировать.']
    ]
  };

  var FB = [
    ['warn', 'Рекламные аккаунты', 'Три штуки: CoffeeOnline с привязанной оплатой, «SC — Рекламный аккаунт» без оплаты и ещё один в другом бизнес-менеджере.', 'Работаем в <b>одном</b> — CoffeeOnline. Остальные в архив.'],
    ['warn', 'Бизнес-менеджеры', 'Два: «Serikov Coffee Company» и «Serikov Coffee». Активы разъехались между ними.', 'Оставляем <b>один</b>, переносим страницу, пиксель и каталог.'],
    ['ok', 'Страница бренда', 'Serikov Coffee Company — на месте и привязана к кабинету.', 'Ничего делать не нужно.'],
    ['bad', 'Пиксели', 'Шесть штук. Живой один — «Пиксель аккаунта CoffeeOnline», последнее событие 24 сентября, в день переезда сайта.', 'Ставим его на новый сайт. <b>Аудитории живут 180 дней</b> — дальше данные протухнут.'],
    ['bad', 'Каталог товаров', 'Два каталога, оба называются «Новогодние подарки». Товаров магазина в них нет.', 'Новый каталог из фида сайта на <b>212 товаров</b>.'],
    ['bad', 'События покупки', 'Сайт не передаёт в Meta ни просмотр товара, ни корзину, ни оплату.', 'Пиксель плюс <b>серверные события</b> с суммой заказа.']
  ];

  var FUNNEL = [
    ['01', 'Узнал', 'Реклама в Instagram, Facebook и TikTok, поиск Google, карты, посевы. Моя часть — какой аудитории, с каким оффером и по какой цене мы показываемся.', 'Охват, цена 1000 показов, цена клика'],
    ['02', 'Зашёл', 'Сайт открывается быстро и показывает то, что обещало объявление. Моя часть — посадочные, скорость, каталог, фильтры.', 'Клики, отказы, глубина просмотра'],
    ['03', 'Выбрал', 'Карточка со шкалами вкуса, помол, подбор по вкусу, отзывы. Моя часть — чтобы человек понял, что брать, и не ушёл думать.', 'Добавления в корзину и конверсия в корзину'],
    ['04', 'Купил', 'Оформление в одну страницу, понятная доставка, оплата картой. Моя часть — чтобы на этом шаге не терялись деньги.', 'Конверсия в заказ, цена заказа, средний чек'],
    ['05', 'Вернулся', 'Письма по базе, брошенная корзина, скидочные ступени, отзывы. Моя часть — чтобы второй заказ стоил дешевле первого.', 'Повторные покупки и выручка с клиента']
  ];

  var TASKS = [
    ['Снять рилс про новую обжарку', 'content', 'Съёмка и монтаж — производство контента. Я могу сказать, какой ролик нужен под кампанию, но снимает контент-направление.'],
    ['Настроить пиксель и событие покупки', 'digital', 'Техническая часть аналитики: без неё реклама не знает, что заказ оплачен, и не умеет искать похожих покупателей.'],
    ['Придумать рубрики для Instagram на месяц', 'content', 'Контент-план и рубрикатор — работа SMM, у неё своя цель: охват, вовлечение и узнаваемость.'],
    ['Решить, сколько платим за один заказ', 'digital', 'Это экономика рекламы: бюджет, ставки, цена заказа и окупаемость.'],
    ['Подготовить каталог товаров для Facebook', 'digital', 'Фид из Битрикса, каталог в кабинете и связка с пикселем — техническая работа на стороне сайта.'],
    ['Ответить клиенту в директе', 'content', 'Это общение от лица бренда. Если пришла заявка — она уходит в CRM, к менеджерам.'],
    ['Выбрать, какой креатив крутить дальше', 'both', 'Контент делает варианты, я смотрю цифры: какой принёс заказы дешевле. Решение общее, но по данным.'],
    ['Написать текст объявления', 'digital', 'Рекламный текст — часть кампании: он тестируется в паре с аудиторией и оффером.']
  ];

  var OWNERS = { digital: 'Digital', content: 'Контент · SMM', both: 'Совместно' };

  /* ======================= вспомогательное ======================= */

  var root = document.documentElement;
  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function money(n) { return num(Math.round(n)) + ' ₸'; }
  function num(n) { return String(Math.round(n)).replace(/\B(?=(\d{3})+(?!\d))/g, ' '); }
  function pct(n) { return n.toFixed(1).replace('.', ',') + ' %'; }

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

  /* ======================= аккордеоны ======================= */

  function buildAcc(host, rows, openFirst) {
    if (!host) return;
    rows.forEach(function (f, i) {
      var item = document.createElement('div');
      item.className = 'acc-item';
      item.innerHTML =
        '<button class="acc-btn" type="button" aria-expanded="false">' +
        '<span class="sev ' + f[0] + '">' + f[1] + '</span>' +
        '<span>' + f[2] + '</span>' +
        '<span class="mark" aria-hidden="true">+</span>' +
        '</button>' +
        '<div class="acc-body"><div><div class="inner">' +
        '<p>' + f[3] + '</p>' +
        '<p class="fix"><b>Ответ:</b> ' + f[4] + '</p>' +
        '</div></div></div>';
      var btn = item.querySelector('.acc-btn');
      btn.addEventListener('click', function () {
        var open = item.classList.toggle('open');
        btn.setAttribute('aria-expanded', open ? 'true' : 'false');
      });
      if (i === 0 && openFirst) { item.classList.add('open'); btn.setAttribute('aria-expanded', 'true'); }
      host.appendChild(item);
    });
  }

  var accHost = document.getElementById('acc');
  if (accHost) {
    buildAcc(accHost, FINDINGS.map(function (f) {
      return [f[0], f[1], f[2], f[3], f[4]];
    }), true);
    // в аудите подпись другая
    [].slice.call(accHost.querySelectorAll('.fix b')).forEach(function (b) { b.textContent = 'Что делаю:'; });
  }
  buildAcc(document.getElementById('obj'), OBJECTIONS, true);

  /* ======================= карта направлений ======================= */

  var stage = document.getElementById('stage');
  var svg = document.getElementById('links');
  var detail = document.getElementById('detail');
  var nodes = stage ? [].slice.call(stage.querySelectorAll('.node')) : [];
  var lines = [];

  function chip(kind) {
    var text = kind === 'yes' ? 'есть' : (kind === 'part' ? 'частично' : 'нет');
    return '<span class="chip ' + kind + '">' + text + '</span>';
  }

  function renderDetail(key) {
    var b = BRANCHES[key];
    if (!b || !detail) return;
    var html =
      '<div class="detail-head"><span class="tag">Направление ' + b.idx + '</span><h3>' + b.title + '</h3></div>' +
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

  /* ======================= треки стратегии ======================= */

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

  /* ======================= кабинет Facebook ======================= */

  var fbHost = document.getElementById('fbGrid');
  if (fbHost) {
    fbHost.innerHTML = FB.map(function (c) {
      return '<div class="fb-card ' + (c[0] === 'ok' ? '' : c[0]) + '">' +
        '<div class="row"><span class="dot"></span><h4>' + c[1] + '</h4></div>' +
        '<p class="val">' + c[2] + '</p>' +
        '<p class="act">' + c[3] + '</p></div>';
    }).join('');
  }

  /* ======================= калькулятор ======================= */

  var ids = ['budget', 'cpm', 'ctr', 'cr', 'check'];
  var inputs = {};
  ids.forEach(function (id) { inputs[id] = document.getElementById(id); });

  function calc() {
    if (!inputs.budget) return;
    var budget = +inputs.budget.value;
    var cpm = +inputs.cpm.value;
    var ctr = +inputs.ctr.value / 10;      // ползунок в десятых процента
    var cr = +inputs.cr.value / 10;
    var check = +inputs.check.value;

    var imp = budget / cpm * 1000;
    var clicks = imp * ctr / 100;
    var orders = clicks * cr / 100;
    var cpa = orders > 0 ? budget / orders : 0;
    var rev = orders * check;
    var drr = rev > 0 ? budget / rev * 100 : 0;

    document.getElementById('outBudget').textContent = money(budget);
    document.getElementById('outCpm').textContent = money(cpm);
    document.getElementById('outCtr').textContent = pct(ctr);
    document.getElementById('outCr').textContent = pct(cr);
    document.getElementById('outCheck').textContent = money(check);

    document.getElementById('rImp').textContent = num(imp);
    document.getElementById('rClicks').textContent = num(clicks);
    document.getElementById('rOrders').textContent = num(orders);
    document.getElementById('rCpa').textContent = orders >= 1 ? money(cpa) : '—';
    document.getElementById('rRev').textContent = money(rev);
    document.getElementById('rDrr').textContent = rev > 0 ? pct(drr) : '—';

    var v = document.getElementById('verdict');
    if (orders < 1) {
      v.textContent = 'Заказов меньше одного: на таком бюджете тест ничего не покажет. Нужен либо бюджет больше, либо аудитория теплее.';
    } else if (drr < 25) {
      v.textContent = 'Отличный результат: реклама забирает меньше четверти выручки. Такую связку масштабируем.';
    } else if (drr < 50) {
      v.textContent = 'Рабочий результат: реклама окупается, есть запас на маржу. Дальше улучшаем креативы и конверсию сайта.';
    } else if (drr < 100) {
      v.textContent = 'На грани: выручка есть, но почти вся уходит в рекламу. Чиним конверсию сайта и сужаем аудиторию.';
    } else {
      v.textContent = 'Пока в минус: заказ дороже выручки с него. Так тест и работает — мы это видим за две недели, а не за полгода.';
    }
  }

  ids.forEach(function (id) {
    if (inputs[id]) inputs[id].addEventListener('input', calc);
  });
  calc();

  /* ======================= воронка ======================= */

  var funnelHost = document.getElementById('funnel');
  var funnelDetail = document.getElementById('funnelDetail');

  function renderStage(i) {
    var s = FUNNEL[i];
    if (!funnelDetail) return;
    funnelDetail.innerHTML =
      '<h4>' + s[0] + ' · ' + s[1] + '</h4>' +
      '<p class="do">' + s[2] + '</p>' +
      '<p class="kpi-line"><b>Чем меряю:</b> ' + s[3] + '</p>';
  }

  if (funnelHost) {
    funnelHost.innerHTML = FUNNEL.map(function (s, i) {
      return '<button class="f-stage' + (i === 0 ? ' on' : '') + '" type="button" data-i="' + i + '">' +
        '<span class="st-n">' + s[0] + '</span><span class="st-t">' + s[1] + '</span></button>';
    }).join('');
    [].slice.call(funnelHost.children).forEach(function (b) {
      b.addEventListener('click', function () {
        [].slice.call(funnelHost.children).forEach(function (x) { x.classList.toggle('on', x === b); });
        renderStage(+b.dataset.i);
      });
    });
    renderStage(0);
  }

  /* ======================= разбор задач ======================= */

  var sorter = document.getElementById('sorter');
  var scoreEl = document.getElementById('score');
  var answered = 0, right = 0;

  if (sorter) {
    sorter.innerHTML = TASKS.map(function (t, i) {
      var btns = Object.keys(OWNERS).map(function (k) {
        return '<button class="s-btn" type="button" data-k="' + k + '" data-i="' + i + '">' + OWNERS[k] + '</button>';
      }).join('');
      return '<div class="s-card" data-i="' + i + '"><p class="s-q">' + t[0] + '</p><div class="s-btns">' + btns + '</div></div>';
    }).join('');

    sorter.addEventListener('click', function (e) {
      var btn = e.target.closest('.s-btn');
      if (!btn) return;
      var card = btn.closest('.s-card');
      if (card.classList.contains('done')) return;
      var t = TASKS[+btn.dataset.i];
      var ok = btn.dataset.k === t[1];

      card.classList.add('done');
      [].slice.call(card.querySelectorAll('.s-btn')).forEach(function (b) {
        if (b.dataset.k === t[1]) b.classList.add('right');
        else if (b === btn) b.classList.add('wrong');
        b.disabled = true;
      });

      var ans = document.createElement('p');
      ans.className = 's-ans';
      ans.innerHTML = '<b>' + (ok ? 'Верно. ' : 'На самом деле — ' + OWNERS[t[1]] + '. ') + '</b>' + t[2];
      card.appendChild(ans);

      answered++;
      if (ok) right++;
      if (scoreEl) {
        scoreEl.innerHTML = 'Разобрано задач: <b>' + answered + ' из ' + TASKS.length + '</b>' +
          (answered === TASKS.length ? ' — совпало с реальным распределением: ' + right + '.' : '');
      }
    });
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

    // страховки: переход по якорю, ручная прокрутка, медленная загрузка шрифтов.
    // Ни один блок не должен остаться невидимым, даже если наблюдатель промолчал.
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
