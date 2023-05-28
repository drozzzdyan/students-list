
document.addEventListener('DOMContentLoaded', () => {
  // Этап 2. Создайте массив объектов студентов. Добавьте в него объекты студентов, например 5 студентов.

  const studentsList = [
    { name: 'Иван', surname: 'Иванов', midName: 'Иванович', birthday: new Date(1987, 2, 15), startYear: 2022, faculty: 'ФизМат' },
    { name: 'Даниил', surname: 'Аркадьевич', midName: 'Денисов', birthday: new Date(1991, 11, 25), startYear: 2021, faculty: 'ХимБио' },
    { name: 'Сергей', surname: 'Назарбаев', midName: 'Сергеевич', birthday: new Date(1995, 1, 18), startYear: 2018, faculty: 'ГеоФак' },
    { name: 'Анна', surname: 'Гречина', midName: 'Батьковна', birthday: new Date(1998, 11, 30), startYear: 2015, faculty: 'ФМФ' },
    { name: 'Наталья', surname: 'Дроздова', midName: 'Валентиновна', birthday: new Date(1979, 4, 4), startYear: 2005, faculty: 'Экономический' },
  ]

  // Этап 3. Создайте функцию вывода одного студента в таблицу, по аналогии с тем, как вы делали вывод одного дела в модуле 8. 
  // Функция должна вернуть html элемент с информацией и пользователе. У функции должен быть один аргумент - объект студента.

  function getStudentItem(studentObj) {
    // Вычисляем сколько человеку годиков незаурядным условием
    let now = new Date();
    let age;
    if (now.getMonth() + 1 < studentObj.birthday.getMonth()) {
      age = now.getFullYear() - studentObj.birthday.getFullYear() - 1;
    } else {
      if (now.getDate() < studentObj.birthday.getDate()) {
        age = now.getFullYear() - studentObj.birthday.getFullYear() - 1;
      } else {
        age = now.getFullYear() - studentObj.birthday.getFullYear();
      }
    }
    // год, года, лет в зависимости от числа
    endPhrase = 'лет'
    if (age % 10 === 2 || age % 10 === 3 || age % 10 === 4) {
      endPhrase = 'года'
    } else {
      if (age % 10 === 1) { endPhrase = 'год' }
    }
    // Определим годы обучения и на каком курсе
    let periodsOfStudy;
    if (now.getFullYear() - studentObj.startYear > 4 || now.getMonth() > 7 && now.getFullYear() - studentObj.startYear === 4) {
      periodsOfStudy = String(studentObj.startYear) + '-' + String(studentObj.startYear + 4) + ' (закончил)';
    } else {
      if (now.getMonth() < 8 && now.getFullYear() - studentObj.startYear === 4 || now.getMonth() > 7 && now.getFullYear() - studentObj.startYear === 3) {
        periodsOfStudy = String(studentObj.startYear) + '-' + String(studentObj.startYear + 4) + ' (4 курс)';
      } else {
        if (now.getMonth() < 8 && now.getFullYear() - studentObj.startYear === 3 || now.getMonth() > 7 && now.getFullYear() - studentObj.startYear === 2) {
          periodsOfStudy = String(studentObj.startYear) + '-' + String(studentObj.startYear + 4) + ' (3 курс)';
        } else {
          if (now.getMonth() < 8 && now.getFullYear() - studentObj.startYear === 2 || now.getMonth() > 7 && now.getFullYear() - studentObj.startYear === 1) {
            periodsOfStudy = String(studentObj.startYear) + '-' + String(studentObj.startYear + 4) + ' (2 курс)';
          } else {
            if (now.getMonth() < 8 && now.getFullYear() - studentObj.startYear === 1 || now.getMonth() > 7 && now.getFullYear() - studentObj.startYear === 0) {
              periodsOfStudy = String(studentObj.startYear) + '-' + String(studentObj.startYear + 4) + ' (1 курс)';
            } else {
              periodsOfStudy = 'Error!!!';
            }
          }
        }
      }
    }
    // Формируем в переменные данные о студенте
    let fullName = studentObj.surname + ' ' + studentObj.name + ' ' + studentObj.midName;
    let birthday = studentObj.birthday.getDate() + '.' + studentObj.birthday.getMonth() + '.' + studentObj.birthday.getFullYear() + ' (' + String(age) + ' ' + endPhrase + ')';
    console.log(fullName, studentObj.faculty, birthday, periodsOfStudy);

    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // Формируем DOM элементы для студента
    let row = document.createElement('div');
    row.classList.add('row', 'sheet__rows');
    // блок с ФИО
    let name = document.createElement('div');
    let nameInner = document.createElement('div');
    name.classList.add('col-4');
    nameInner.classList.add('sheet__item', 'sheet__item_name');
    nameInner.textContent = fullName;
    name.append(nameInner);
    row.append(name);
    document.querySelector('.sheet').children[0].append(row);
    // Факультет
    let faculty = document.createElement('div');
    let facultyInner = document.createElement('div');
    faculty.classList.add('col-2');
    facultyInner.classList.add('sheet__item', 'sheet__item_faculty');
    facultyInner.textContent = studentObj.faculty;
    faculty.append(facultyInner);
    row.append(faculty);
    document.querySelector('.sheet').children[0].append(row);
    // Дата рождения
    let birthdayDOM = document.createElement('div');
    let birthdayDOMInner = document.createElement('div');
    birthdayDOM.classList.add('col-3');
    birthdayDOMInner.classList.add('sheet__item', 'sheet__item_date');
    birthdayDOMInner.textContent = birthday;
    birthdayDOM.append(birthdayDOMInner);
    row.append(birthdayDOM);
    document.querySelector('.sheet').children[0].append(row);
    // Годы обучения
    let study = document.createElement('div');
    let studyInner = document.createElement('div');
    study.classList.add('col-3');
    studyInner.classList.add('sheet__item', 'sheet__item_start-year');
    studyInner.textContent = periodsOfStudy;
    study.append(studyInner);
    row.append(study);
    document.querySelector('.sheet').children[0].append(row);
  }

  // Этап 4. Создайте функцию отрисовки всех студентов. Аргументом функции будет массив студентов.
  // Функция должна использовать ранее созданную функцию создания одной записи для студента.
  // Цикл поможет вам создать список студентов.Каждый раз при изменении списка студента вы будете вызывать эту функцию для отрисовки таблицы.

  function renderStudentsTable(studentsArray) {
    let sheetRows = document.querySelectorAll('.sheet__rows');
    // Сначала сотрём
    sheetRows.forEach(element => {
      element.remove();
    });
    // Потом отрисуем
    studentsArray.forEach(element => {
      getStudentItem(element);
    });
  }
  renderStudentsTable(studentsList);

  // Этап 5. К форме добавления студента добавьте слушатель события отправки формы, в котором будет проверка введенных данных.
  // Если проверка пройдет успешно, добавляйте объект с данными студентов в массив студентов и запустите функцию отрисовки таблицы студентов

  // Функция для того, чтобы делать первую букву строки большой
  function capitalize(text) {
    return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
  }

  let btnForm = document.querySelector('.add-students__btn');
  btnForm.addEventListener('click', (el) => {
    el.preventDefault();
    // Переменная о наличии ошибки и под сообщение об ошибках
    let countMistake = 0;
    let massageMistake = [];

    // Нормализируем имя, а потом проверка на правильность
    let nameForm = document.querySelectorAll('.search__input_name')[1];
    let normalizeFullName = nameForm.value.trim().split(' ');
    let normalizeName = '';
    let normalizeSurName = '';
    let normalizeMidName = '';

    while (normalizeFullName.includes('')) {
      normalizeFullName.splice(normalizeFullName.indexOf(''), 1);
    }

    if (normalizeFullName.length === 0) {
      massageMistake.push('ФИО: пусто');
      countMistake++;
    }
    if (normalizeFullName.length === 1) {
      massageMistake.push('ФИО: недостаточно');
      countMistake++;
    }
    if (normalizeFullName.length > 3) {
      massageMistake.push('ФИО: избытчно');
      countMistake++;
    }
    if (normalizeFullName.length === 2) {
      normalizeName = capitalize(normalizeFullName[1]);
      normalizeSurName = capitalize(normalizeFullName[0]);
    }
    if (normalizeFullName.length === 3) {
      normalizeName = capitalize(normalizeFullName[1]);
      normalizeSurName = capitalize(normalizeFullName[0]);
      normalizeMidName = capitalize(normalizeFullName[2]);
    }
    // console.log(normalizeFullName, massageMistake);

    // Проверяем возраст
    let birthdayForm = document.querySelectorAll('.search__input_date')[0];
    let normalizeBirthday = birthdayForm.value.split('-');
    let normalizeBirthdayYear = parseInt(normalizeBirthday[0]);
    let normalizeBirthdayMonth = parseInt(normalizeBirthday[1]);
    let normalizeBirthdayDay = parseInt(normalizeBirthday[2]);
    let now = new Date();

    if (normalizeBirthdayYear > now.getFullYear() || normalizeBirthdayMonth - 1 > now.getMonth() && normalizeBirthdayYear === now.getFullYear()
      || normalizeBirthdayDay > now.getDate() && normalizeBirthdayMonth - 1 === now.getMonth() && normalizeBirthdayYear === now.getFullYear()) {
      massageMistake.push('Ещё не родился!');
      countMistake++;
    }
    if (normalizeBirthdayYear < 1900) {
      massageMistake.push('Дата рождения: недопустимо');
      countMistake++;
    }
    if (normalizeBirthday.length === 1) {
      massageMistake.push('Дата рождения: недопустимо');
      countMistake++;
    }
    // console.log(normalizeBirthday, massageMistake);

    // Проверяем начало обучения
    let startYearForm = document.querySelectorAll('.search__input_start-year')[1];
    let normalizeStartYear = startYearForm.value.trim().split(' ');

    if (normalizeStartYear.length != 1 || normalizeStartYear.length === 1 && normalizeStartYear[0] === '' ||
      normalizeStartYear.length === 1 && normalizeStartYear[0] < 2000 || normalizeStartYear.length === 1 && normalizeStartYear[0] > now.getFullYear()) {
      massageMistake.push('Год поступления: недопустимо');
      countMistake++;
    } else {
      normalizeStartYear = parseInt(normalizeStartYear[0]);
    }

    // Проверяем факультет
    let facultyForm = document.querySelectorAll('.search__input_faculty')[1];

    let normalizeFaculty = facultyForm.value.trim().split(' ');
    let normalizeFacultyMassage = '';
    while (normalizeFaculty.includes('')) {
      normalizeFaculty.splice(normalizeFaculty.indexOf(''), 1);
    }
    if (normalizeFaculty.length === 0) {
      massageMistake.push('Факультет: недопустимо');
      countMistake++;
    }
    normalizeFaculty.forEach(element => {
      normalizeFacultyMassage += element + ' ';
    });
    normalizeFacultyMassage = normalizeFacultyMassage.substring(0, normalizeFacultyMassage.length - 1);  // Уберем в конце пробел
    console.log(normalizeName, normalizeSurName, normalizeMidName);

    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // Проверка всех ошибок, если всё ок, добавляем нового студента, если нет, то выводим ошибки
    if (countMistake === 0) {
      studentsList.push(
        {
          name: normalizeName,
          surname: normalizeSurName,
          midName: normalizeMidName,
          birthday: new Date(normalizeBirthdayYear, normalizeBirthdayMonth, normalizeBirthdayDay),
          startYear: normalizeStartYear,
          faculty: normalizeFacultyMassage,
        })
      renderStudentsTable(studentsList);
      // Очистим поля ввода и поле с ошибками
      [nameForm.value, birthdayForm.value, startYearForm.value, facultyForm.value] = ['', '', '', ''];
      if (document.querySelector('.mistakes') !== null) {
        document.querySelector('.mistakes').remove();
      }
    } else {
      // проверяем, есть ли элемент, если да, то стираем, апотом заново вывводим
      if (document.querySelector('.mistakes') !== null) {
        document.querySelector('.mistakes').remove();
      }
      // Создаём окно с ошибками
      let mistakes = document.createElement('ol');
      mistakes.classList.add('mistakes');
      btnForm.parentNode.append(mistakes);
      for (let i = 0; i < countMistake; i++) {
        let li = document.createElement('li');
        li.textContent = massageMistake[i];
        mistakes.append(li);
      }
      mistakes.style.top = String((mistakes.offsetHeight + 20) * (-1)) + 'px' // Высчитаем отсутп от элемента

      // Убираем уведомление об ошибках спустя некоторое время
      let mistakeOff = setTimeout(() => {
        document.querySelector('.mistakes').remove();
        clearTimeout(mistakeOff);
      }, 1500 * countMistake);
    }
  });

  // Этап 5. Создайте функцию сортировки массива студентов и добавьте события кликов на соответствующие колонки.

  function sortStudentsList(sortList, criterion, direction = false) {
    return sortList.sort((a, b) => {
      if (direction ? a[criterion] < b[criterion] : a[criterion] > b[criterion]) return -1;
    })

  }

  let nameSort = document.querySelector('.sheet__column-header_name');
  let facultySort = document.querySelector('.sheet__column-header_faculty');
  let birthdaySort = document.querySelector('.sheet__column-header_date');
  let startYearsSort = document.querySelector('.sheet__column-header_start-year');

  let sortDirection = false;

  nameSort.addEventListener('click', (e) => {
    e.preventDefault();
    renderStudentsTable(sortStudentsList(studentsList, 'surname', sortDirection));
    sortDirection = !sortDirection;
  });

  facultySort.addEventListener('click', (e) => {
    e.preventDefault();
    renderStudentsTable(sortStudentsList(studentsList, 'faculty', sortDirection));
    sortDirection = !sortDirection;
  });

  birthdaySort.addEventListener('click', (e) => {
    e.preventDefault();
    renderStudentsTable(sortStudentsList(studentsList, 'birthday', sortDirection));
    sortDirection = !sortDirection;
  });

  startYearsSort.addEventListener('click', (e) => {
    e.preventDefault();
    renderStudentsTable(sortStudentsList(studentsList, 'startYear', sortDirection));
    sortDirection = !sortDirection;
  });

  // Этап 6. Создайте функцию фильтрации массива студентов и добавьте события для элементов формы.
  // Будет в меру "умный" фильтр, который будет стараться искать соответствие по-максимуму

  function studentsFilter(filterArray, criterion, searchValue) {
    let normalizeValue;
    if (criterion === 'fullname') {
      normalizeValue = String(searchValue).trim().split(' ');
      // Разбиваем на масиив по пробелу и удаляем все пустые элементы
      while (normalizeValue.includes('')) {
        normalizeValue.splice(normalizeValue.indexOf(''), 1);
      }
      // Тут делаем все слова с большой буквы
      for (let i = 0; i < normalizeValue.length; i++) {
        normalizeValue[i] = capitalize(normalizeValue[i]);
      }
      // А тут пошло поехало, будем учитывать, что пользователь может начать вводить не по порядку Ф И О
      if (normalizeValue.length > 3) {
        return [];
      }
      if (normalizeValue.length === 3) {
        return filterArray.filter(student =>
          student.name.includes(normalizeValue[0]) && student.surname.includes(normalizeValue[1]) && student.midName.includes(normalizeValue[2])
          || student.name.includes(normalizeValue[0]) && student.surname.includes(normalizeValue[2]) && student.midName.includes(normalizeValue[1])
          || student.name.includes(normalizeValue[1]) && student.surname.includes(normalizeValue[0]) && student.midName.includes(normalizeValue[2])
          || student.name.includes(normalizeValue[1]) && student.surname.includes(normalizeValue[2]) && student.midName.includes(normalizeValue[0])
          || student.name.includes(normalizeValue[2]) && student.surname.includes(normalizeValue[1]) && student.midName.includes(normalizeValue[0])
          || student.name.includes(normalizeValue[2]) && student.surname.includes(normalizeValue[0]) && student.midName.includes(normalizeValue[1]));
      }
      if (normalizeValue.length === 2) {
        return filterArray.filter(student =>
          student.name.includes(normalizeValue[0]) && student.surname.includes(normalizeValue[1])
          || student.name.includes(normalizeValue[1]) && student.surname.includes(normalizeValue[0]));
      }
      if (normalizeValue.length === 1) {
        return filterArray.filter(student =>
          student.name.includes(normalizeValue[0]) || student.surname.includes(normalizeValue[0]) || student.midName.includes(normalizeValue[0]));
      }
      if (normalizeValue.length === 0) {
        return filterArray;
      }
    }
    if (criterion === 'faculty') {
      normalizeValue = String(searchValue).trim()
      return filterArray.filter(student => student.faculty.includes(normalizeValue));
    }
    if (criterion === 'startYear') {
      normalizeValue = parseInt(searchValue);
      if (normalizeValue > 2000) {
        return filterArray.filter(student => student.startYear === normalizeValue);
      } else {
        return filterArray;
      }
    }
    if (criterion === 'endYear') {
      normalizeValue = parseInt(searchValue) - 4;
      console.log(normalizeValue);
      if (normalizeValue > 2000) {
        return filterArray.filter(student => student.startYear === normalizeValue);
      } else {
        return filterArray;
      }
    }
  }

  let nameFilter = document.querySelector('.search__input_name');
  let facultyFilter = document.querySelector('.search__input_faculty');
  let startYearFilter = document.querySelector('.search__input_start-year');
  let endYearFilter = document.querySelector('.search__input_end-year');

  nameFilter.addEventListener('input', () => {
    renderStudentsTable(studentsFilter(studentsList, 'fullname', nameFilter.value))
  })

  facultyFilter.addEventListener('input', () => {
    renderStudentsTable(studentsFilter(studentsList, 'faculty', facultyFilter.value))
  })

  startYearFilter.addEventListener('input', () => {
    renderStudentsTable(studentsFilter(studentsList, 'startYear', startYearFilter.value))
  })

  endYearFilter.addEventListener('input', () => {
    renderStudentsTable(studentsFilter(studentsList, 'endYear', endYearFilter.value))
  })
})