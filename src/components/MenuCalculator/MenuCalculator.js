import React,{useState} from 'react'
import {Menu} from "semantic-ui-react";

export  default  function MenuCalculator() {

   let [page,setPage] = useState(0);

  function changePage (_page) {

      setPage(page = _page)
  }

    return(

        <Menu tabular>
            <Menu.Item
                name='bio'
                active={activeItem === 'bio'}
                onClick={changePage(0)}
            />
            <Menu.Item
                name='photos'
                active={activeItem === 'photos'}
                onClick={this.handleItemClick}
            />
        </Menu>
    );

}