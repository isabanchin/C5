// JSON, который мы будем парсить
const jsonString = `
{
 "list": [
  {
   "name": "Petr",
   "age": "20",
   "prof": "mechanic"
  },
  {
   "name": "Vova",
   "age": "60",
   "prof": "pilot"
  }
 ]
}`

const data = JSON.parse(jsonString);
const list = data.list;

const result = { list: [] }
for (i = 0; i < list.length; i += 1) {
    student = {
        name: list[i].name,
        age: list[i].age,
        prof: list[i].prof,
    }
    result.list.push(student)
}
console.log(result);