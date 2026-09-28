/* Serikov Coffee — карта развития digital.
   Тексты направлений и находок лежат здесь: правьте BRANCHES и FINDINGS, разметку трогать не нужно. */

(function () {
  'use strict';

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
      why: 'Пиксель начинает копить аудиторию с первого дня — ещё до старта рекламы. Чем раньше поставим, тем дешевле будет первый запуск.',
      gives: 'Реклама учится на наших покупателях, а не на случайных людях.',
      items: [
        ['no', 'Meta Pixel и серверная передача событий (Conversions API)'],
        ['no', 'TikTok Pixel и Events API'],
        ['no', 'Тег Google Ads с конверсией по оплаченному заказу'],
        ['no', 'Аудитории: смотрели товар, бросили корзину, купили'],
        ['yes', 'База 7 894 клиента — готовая основа для похожих аудиторий'],
        ['part', 'История 73 заказов: мало для обучения, но старт есть']
      ]
    },
    ads: {
      idx: '03',
      title: 'Реклама и трафик',
      why: 'Первый бюджет идёт на тёплых: тех, кто уже был на сайте или похож на наших покупателей. Холодные интересы — следующим шагом.',
      gives: 'Управляемый поток заказов с понятной ценой покупателя.',
      items: [
        ['no', 'Ретаргет на тех, кто смотрел товар и не купил'],
        ['no', 'Похожие аудитории по покупателям'],
        ['no', 'Интересы как гипотезы: кофе, завтраки, бег, товары для дома'],
        ['no', 'Google Поиск: «купить кофе в зёрнах» и брендовые запросы'],
        ['no', 'Performance Max — после накопления конверсий'],
        ['no', 'Динамическая реклама каталога: показываем тот кофе, что смотрели']
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
        ['no', 'Карта лояльности в Apple и Google Wallet'],
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

  var root = document.documentElement;
  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- тема ---------- */

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

  /* ---------- аккордеон аудита ---------- */

  var acc = document.getElementById('acc');
  if (acc) {
    FINDINGS.forEach(function (f, i) {
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
        '<p class="fix"><b>Что делаю:</b> ' + f[4] + '</p>' +
        '</div></div></div>';
      var btn = item.querySelector('.acc-btn');
      btn.addEventListener('click', function () {
        var open = item.classList.toggle('open');
        btn.setAttribute('aria-expanded', open ? 'true' : 'false');
      });
      if (i === 0) { item.classList.add('open'); btn.setAttribute('aria-expanded', 'true'); }
      acc.appendChild(item);
    });
  }

  /* ---------- карта направлений ---------- */

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

  function select(key) {
    nodes.forEach(function (n) { n.classList.toggle('on', n.dataset.key === key); });
    lines.forEach(function (l) { l.classList.toggle('on', l.dataset.key === key); });
    renderDetail(key);
  }

  nodes.forEach(function (n) {
    n.addEventListener('click', function () { select(n.dataset.key); });
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

  /* ---------- счётчики ---------- */

  function countUp(el) {
    var target = parseInt(el.dataset.count, 10);
    if (!target || reduced) return;
    var dur = 1100;
    var start = null;
    function step(ts) {
      if (start === null) start = ts;
      var p = Math.min((ts - start) / dur, 1);
      var eased = 1 - Math.pow(1 - p, 3);
      var v = Math.round(target * eased);
      el.textContent = v >= 1000 ? String(v).replace(/\B(?=(\d{3})+(?!\d))/g, ' ') : String(v);
      if (p < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }

  /* ---------- появление ---------- */

  var revealables = [].slice.call(document.querySelectorAll('.reveal'));

  function show(el) {
    el.classList.add('in');
    [].slice.call(el.querySelectorAll('[data-count]')).forEach(countUp);
    if (el.matches('[data-count]')) countUp(el);
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
  }
})();
