const fs = require("fs");
const readline = require("readline");

const readlineSomeData = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

console.log(
  "Что-бы вызвать список задач напишите команду и напишите новую заметку после двоеточия пример - add: моя важная заметка. \n Что-бы вывести список задач напишите команду get. \n  Что-бы отметить заметку как выполненную введите номер заметки внутри команды done() если пометить внутрь номер выполненной заметки, то заметка отметиться как 'Не выполнено' и наоборот (счет начинается с единицы). Пример: done(2) \n. Что-бы удалить заметку укажите номер заметки внутри delete() (счет начинается с единицы). Пример delete(4)"
);

readlineSomeData.on("line", (data) => {
  if (data.trim().toLowerCase().includes("add")) {
    fs.readFile("./store/store.json", (err, dataList) => {
      if (err) {
        throw err;
      }
      let arr;
      let setNewData = {
        data: data.slice(4),
        isDone: false,
        isDoneText: "(Не выполнено)",
      };
      if (dataList.toString().trim() === "") {
        arr = [setNewData];
      } else {
        arr = [setNewData, ...JSON.parse(dataList)];
      }
      console.log("добавлено", arr);
      fs.writeFile("./store/store.json", JSON.stringify(arr), (err) => {
        if (err) {
          throw err;
        }
      });
    });
  } else if (data.trim().toLowerCase() === "get") {
    fs.readFile("./store/store.json", (err, dataList) => {
      if (err) {
        throw err;
      }
      let getData = JSON.parse(dataList);
      console.log(
        "Заметки: \n",
        getData.map(
          (item, i) => i + 1 + ". " + item.data + item.isDoneText + " \n"
        )
      );
    });
  } else if (data.trim().toLowerCase().includes("done")) {
    fs.readFile("./store/store.json", (err, dataList) => {
      if (err) {
        throw err;
      }

      let arr;
      let num = data.toString().trim().slice(5, 6);
      let parseData = JSON.parse(dataList);

      console.log(num);

      if (num === ")") {
        console.log("ничего не указано, введите номер");
      }

      arr = parseData.map((item, index) => {
        if (index === num - 1) {
          if (item.isDone === true) {
            return (item = Object.assign({}, item, {
              isDone: false,
              isDoneText: "(Не выполнено)",
            }));
          } else {
            return (item = Object.assign({}, item, {
              isDone: true,
              isDoneText: "(Выполнено)",
            }));
          }
        } else {
          return item;
        }
      });
      console.log("arr", arr);

      fs.writeFile("./store/store.json", JSON.stringify(arr), (err) => {
        if (err) {
          throw err;
        }
      });
    });
  } else if (data.trim().toLowerCase().includes("delete")) {
    fs.readFile("./store/store.json", (err, dataList) => {
      if (err) {
        throw err;
      }

      let arr;
      let num = data.toString().trim().slice(7, 8);
      let parseData = JSON.parse(dataList);
      console.log(parseData, num);

      if (num === ")") {
        console.log("ничего не указано, введите номер");
      }

      arr = parseData.filter((item, index) => index !== num - 1);
      console.log("arr", arr);

      fs.writeFile("./store/store.json", JSON.stringify(arr), (err) => {
        if (err) {
          throw err;
        }
      });
    });
  } else {
    console.log("вы ввели неправильную команду");
  }
});
