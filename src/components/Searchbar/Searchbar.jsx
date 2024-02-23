import { useState } from 'react';
import css from './Searchbar.module.css';

export const Searchbar = props => {
  const [searchText, setSearchText] = useState('');

  const handleChange = evt => {
    evt.preventDefault();
    setSearchText(evt.target.value);
  };

  const handleSubmit = evt => {
    evt.preventDefault();
    props.handleSubmit(searchText);
  };

  return (
    <header className={css.searchbar}>
      <form className={css.form} onSubmit={handleSubmit}>
        <button type="submit" className={css.button}>
          <span className={css.buttonLabel}>Search</span>
        </button>

        <input
          onChange={handleChange}
          className={css.input}
          type="text"
          name="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
      </form>
    </header>
  );
};
