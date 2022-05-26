import { Component } from 'react';
import styles from './App.module.css';

import Searchbar from 'components/Searchbar';
import ImageGallery from 'components/ImageGallery';
import Button from 'shared/components/Button/Button';


import { getImages } from 'shared/services/images';

class App extends Component {
  state = {
    q: "",
    items: [],
    loading: false,
    error: null,
    page: 1,
  }

  async componentDidUpdate(prevProps, prevState) {
    const { q, page } = this.state;
    if (q !== prevState.q || page > prevState.page) {
      this.setState({
        loading: true,
        error: null,
      });

      try {
        const items = await getImages(q, page)
        this.setState(prevState => {
          return {
            items: [...prevState.items, ...items],
            loading: false,
          }
        })
      } catch (error) {
        this.setState({
          loading: false,
          error: error.message,
        });
      }
    }
  }

  setSearch = ({q}) => {
    this.setState({
      q,
      items: [],
      page: 1,
    })
  }

  loadMore = () => {
    this.setState(({ page }) => {
      return {
        page: page + 1,
      }
    })
  }
  
  render() {
    const { loading, items } = this.state;
    const { setSearch, loadMore} = this;
    return (
      <div className={styles.App}>
        <Searchbar onSubmit={setSearch} />
        {Boolean(items.length) &&
          <ImageGallery items={items} />
        }
        {loading && <p>...Loading</p>}
        {!loading && Boolean(items.length) && (
          <Button text='Load more' loadMore={loadMore}></Button>
        )}
      </div>
    );
  }
};

export default App