const parser = new DOMParser();

// XML, который мы будем парсить
const xmlString = `
<list>
  <student>
    <name lang="en">
      <first>Ivan</first>
      <second>Ivanov</second>
    </name>
    <age>35</age>
    <prof>teacher</prof>
  </student>
  <student>
    <name lang="ru">
      <first>Петр</first>
      <second>Петров</second>
    </name>
    <age>58</age>
    <prof>driver</prof>
  </student>
</list>
`;

// Парсинг XML
const xmlDOM = parser.parseFromString(xmlString, "text/xml");

// Получение всех DOM-нод
const listNode = xmlDOM.querySelector("list");
const nameNode = xmlDOM.querySelectorAll("name");
const firstNode = xmlDOM.querySelectorAll("first");
const secondNode = xmlDOM.querySelectorAll("second");
const ageNode = xmlDOM.querySelectorAll("age");
const proftNode = xmlDOM.querySelectorAll("prof");

result = { "list": [] }
for (i = 0; i < nameNode.length; i += 1) {
    let student = {
        name: `${firstNode[i].textContent} ${secondNode[i].textContent}`,
        age: Number(ageNode[i].textContent),
        prof: proftNode[i].textContent,
        lang: nameNode[i].getAttribute("lang"),
    }
    result.list.push(student)
}
console.log(result)