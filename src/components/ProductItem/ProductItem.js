import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class ProductItem extends Component {
    onDelete = (id) => {
        if(confirm ('Bạn có chắc chắn muốn xóa')) { //eslint-disable-line
            this.props.onDelete(id);
        }
    }
    render() {
        var {
                props: { index, product }
            } = this;
        var statusName = product.status ? 'Còn hàng' : 'Hết hàng';
        var statusClassName = product.status ? 'warning' : 'success';
        return (
            <tr>
                <td>{index+1}</td>
                <td>{product.id}</td>
                <td>{product.name}</td>
                <td>{product.price}</td>
                <td>
                    <span className={`label label-${statusClassName}`}>
                        { statusName }
                    </span>
                </td>
                <td>
                    <Link 
                        to={`product/${product.id}/edit`} 
                        className="btn btn-success"
                    >
                        Sửa
                    </Link>&nbsp;
                    <button 
                        type="button"
                        className="btn btn-danger"
                        onClick={ () => this.onDelete(product.id) }
                    >
                        Xóa
                    </button>
                </td>
            </tr>			
        )   
    }
}

export default ProductItem;