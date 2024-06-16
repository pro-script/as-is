## Enum type
### Enum type Basic
```js
Enum.init('enum object here')
```
### Enum type Basic usage
Use increment
```js
Enum.init({
    RED: 0,
    GREEN: Enum.inc,
    BLUE: Enum.inc,
});

// Enum {
//   '0': 'RED',
//   '1': 'GREEN',
//   '2': 'BLUE',
//   RED: 0,
//   GREEN: 1,
//   BLUE: 2
// }
```
Use decrement
```js
Enum.init({
    ROOF: 2,
    FLOOR: Enum.dec,
    BASEMENT: Enum.dec,
});
// Enum {
//   '0': 'BASEMENT',
//   '1': 'FLOOR',
//   '2': 'ROOF',
//   ROOF: 2,
//   FLOOR: 1,
//   BASEMENT: 0
// }
```
Use both
```js
Enum.init({
    RED: 0,
    GREEN: Enum.inc,
    BLUE: Enum.inc,
    ROOF: 6,
    FLOOR: Enum.dec,
    BASEMENT: Enum.dec,
});
// Enum {
//   '0': 'RED',
//   '1': 'GREEN',
//   '2': 'BLUE',
//   '4': 'BASEMENT',
//   '5': 'FLOOR',
//   '6': 'ROOF',
//   RED: 0,
//   GREEN: 1,
//   BLUE: 2,
//   ROOF: 6,
//   FLOOR: 5,
//   BASEMENT: 4
// }
```
Use with step
```js
Enum.init({
    [Enum.step]: 10, // ['Enum.step'] the same but with a quotes
    RED: Enum.inc,
    GREEN: Enum.inc,
    BLUE: Enum.inc,
});

// Enum {
//   '10': 'RED',
//   '20': 'GREEN',
//   '30': 'BLUE',
//   RED: 10,
//   GREEN: 20,
//   BLUE: 30
// }
const enumExample = Enum.init({
    [Enum.step]: 10,
    ROOF: Enum.dec,
    FLOOR: 30,
    BASEMENT: Enum.dec,
});
// Enum {
//   '10': 'ROOF',
//   '20': 'BASEMENT',
//   '30': 'FLOOR',
//   ROOF: 10,
//   FLOOR: 30,
//   BASEMENT: 20
// }
```
Check the Enum type like this
```js
as.Enum(enumExample) && as.enum(enumExample);
```
