// Список курсов
let courses = [
  { name: "Courses in England", prices: [0, 100] }, 
  { name: "Courses in Germany", prices: [500, null] }, 
  { name: "Courses in Italy", prices: [100, 200] }, 
  { name: "Courses in Russia", prices: [null, 400] },
  { name: "Courses in China", prices: [50, 250] },
  { name: "Courses in USA", prices: [200, null] },
  { name: "Courses in Kazakhstan", prices: [56, 324] },
  { name: "Courses in France", prices: [null, null] },
];

// Варианты цен (фильтры), которые ищет пользователь
let requiredRange1 = [null, 200];
let requiredRange2 = [100, 350];
let requiredRange3 = [200, null];


// ============================================


/*
  inRange(item) minCheck && maxCheck

  minCheck:
    filterRangeValue == null      ----> проверка пройдена
    filterMinPrice < courseMinPrice && filterMinPrice < courseMaxPrice    ----> проверка пройдена

  maxCheck:
    filterRangeValue == null      ----> проверка пройдена
    filterMaxPrice > courseMaxPrice && filterMaxPrice > courseMaxPrice    ----> проверка пройдена
*/

function defined(value) {
  return value != null ? true : false
}

function isNotLessMin(courseMinPrice, courseMaxPrice, filterMinPrice) {
  if (!defined(filterMinPrice) ) return true
  if (defined(courseMaxPrice) && filterMinPrice > courseMaxPrice) return false
  if (defined(courseMinPrice) && filterMinPrice > courseMinPrice) return false
  return true
}
function isNotGreaterMax(courseMinPrice, courseMaxPrice, filterMaxPrice) {
  if (!defined(filterMaxPrice) ) return true
  if (defined(courseMinPrice) && filterMaxPrice < courseMinPrice) return false
  if (defined(courseMaxPrice) && filterMaxPrice < courseMaxPrice) return false
  return true
}

function isPriceInRange(courseMinPrice, courseMaxPrice, filterMinPrice, filterMaxPrice) {
  return isNotLessMin(courseMinPrice, courseMaxPrice, filterMinPrice) 
    && isNotGreaterMax(courseMinPrice, courseMaxPrice, filterMaxPrice)
}

function getCoursesFilteredByPrice(courses, filterRange) {
  return courses.filter(course => isPriceInRange(...course.prices, ...filterRange))
}
function getCoursesSortedByPrice(courses) {
  return courses.sort((a, b) => a.prices[0] - b.prices[0] )
}


// RESULT: 

const filtered1 = getCoursesFilteredByPrice(courses, requiredRange1)
const sorted1 = getCoursesSortedByPrice(filtered1)
console.log(sorted1)
// output for: requiredRange1 = [null, 200]
// [
//   { name: 'Courses in England', prices: [ 0, 100 ] },
//   { name: 'Courses in France', prices: [ null, null ] },
//   { name: 'Courses in Italy', prices: [ 100, 200 ] },
//   { name: 'Courses in USA', prices: [ 200, null ] }
// ]
const filtered2 = getCoursesFilteredByPrice(courses, requiredRange2)
const sorted2 = getCoursesSortedByPrice(filtered2)
console.log(sorted2)
// output for: requiredRange2 = [100, 350]
// [
//   { name: 'Courses in France', prices: [ null, null ] },
//   { name: 'Courses in Italy', prices: [ 100, 200 ] },
//   { name: 'Courses in USA', prices: [ 200, null ] }
// ]
const filtered3 = getCoursesFilteredByPrice(courses, requiredRange3)
const sorted3 = getCoursesSortedByPrice(filtered3)
console.log(sorted3)
// output for: requiredRange3 = [200, null]
// [
//   { name: 'Courses in Russia', prices: [ null, 400 ] },
//   { name: 'Courses in France', prices: [ null, null ] },
//   { name: 'Courses in USA', prices: [ 200, null ] },
//   { name: 'Courses in Germany', prices: [ 500, null ] }
// ]