import "./App.css";
import { Fragment, useState } from "react";

// Implement a feature to allow item selection with the following requirements:
// 1. Clicking an item selects/unselects it.
// 2. Multiple items can be selected at a time.
// 3. Make sure to avoid unnecessary re-renders of each list item in the big list (performance).
// 4. Currently selected items should be visually highlighted.
// 5. Currently selected items' names should be shown at the top of the page.
//
// Feel free to change the component structure at will.

/**
 * Please understand this is a quick application coding solution and
 * I did not completely test accessibility or all edge cases.
 *
 * This exercise could be abstracted further to create a more reliable
 * clickable list component but for the sake of the exercise, an MVP was
 * made and works.
 *
 * Thank you for your consideration
 */

const ListItem = (props) => {
  const {
    name,
    color,
    children,
    selected: defaultSelected,
    selectedItems,
    setSelectedItems,
    ...restOfProps
  } = props;
  const [selected, setSelected] = useState(defaultSelected);

  const handleClick = (name) => {
    const updatedSelected = !selected;
    setSelected(updatedSelected);

    if (updatedSelected) {
      setSelectedItems([...selectedItems, name]);
    } else {
      const tempSelectedItems = selectedItems;
      tempSelectedItems.splice(selectedItems.indexOf(name), 1);
      setSelectedItems([...tempSelectedItems]);
    }
  };

  return (
    <Fragment>
      <li
        key={name}
        className={`List__item List__item--${color} ${
          selected ? "List__item--selected" : ""
        }`}
        {...restOfProps}
      >
        <button
          className={`List__item__button`}
          onClick={() => handleClick(name)}
          aria-pressed={selected}
        >
          {children} {selected ? "\u2714 " : ""}
        </button>
      </li>
    </Fragment>
  );
};

const List = ({ items }) => {
  const [selectedItems, setSelectedItems] = useState([]);

  return (
    <Fragment>
      <ul className={`Selected_List`}>
        {selectedItems.length > 0 &&
          selectedItems.map((entry) => (
            <li key={`selected_${entry}`}>{entry}</li>
          ))}
      </ul>
      <ul className="List">
        {items.map((item) => {
          return (
            <ListItem
              {...item}
              selectedItems={selectedItems}
              setSelectedItems={setSelectedItems}
            >
              {item.name}
            </ListItem>
          );
        })}
      </ul>
    </Fragment>
  );
};

// ---------------------------------------
// Do NOT change anything below this line.
// ---------------------------------------

const sizes = ["tiny", "small", "medium", "large", "huge"];
const colors = [
  "navy",
  "blue",
  "aqua",
  "teal",
  "olive",
  "green",
  "lime",
  "yellow",
  "orange",
  "red",
  "maroon",
  "fuchsia",
  "purple",
  "silver",
  "gray",
  "black",
];
const fruits = [
  "apple",
  "banana",
  "watermelon",
  "orange",
  "peach",
  "tangerine",
  "pear",
  "kiwi",
  "mango",
  "pineapple",
];

const items = sizes.reduce(
  (items, size) => [
    ...items,
    ...fruits.reduce(
      (acc, fruit) => [
        ...acc,
        ...colors.reduce(
          (acc, color) => [
            ...acc,
            {
              name: `${size} ${color} ${fruit}`,
              color,
            },
          ],
          []
        ),
      ],
      []
    ),
  ],
  []
);

function App() {
  return (
    <div className="App">
      <List items={items} />
    </div>
  );
}

export default App;
