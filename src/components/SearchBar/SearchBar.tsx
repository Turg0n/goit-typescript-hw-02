import css from "../SearchBar/SearchBar.module.css";
import { toast } from "react-hot-toast";
import { FormEvent } from 'react';

interface ISearchBarProps {
  onSearch: (query: string) => void;
}

const SearchBar: React.FC<ISearchBarProps> = ({ onSearch }) => {
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const query = (form.elements.namedItem('query') as HTMLInputElement).value;

    if (!query.trim().length) {
      toast.error('Input field is empty. Please provide a value.');

      return;
    }

    onSearch(query);
    form.reset();
  };
  return (
    <header className={css.searchWrapper}>
      <form className={css.form} onSubmit={handleSubmit}>
        <input
          className={css.inputText}
          type="text"
          name="searchInput"
          placeholder="Search images and photos"
        />
        <button type="submit" >
          Search
        </button>
      </form>
    </header>
  );
};

export default SearchBar;