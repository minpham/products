import React, { Component } from 'react';
import ProductList from '../../components/ProductList/ProductList';
import ProductItem from '../../components/ProductItem/ProductItem';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { actFetchProductsRequest, actDeleteProductRequest } from '../../actions/index';

class ProductListPage extends Component {

    componentDidMount() {
       this.props.fetchAllProducts();
    }
    
    onDelete = (id) => {
        this.props.fetchDeleteProduct(id);
    }

    render() {
        var { products } = this.props;
        return (
            <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                <Link to="/product/add" className="btn btn-info">
                    Thêm sản phẩm
                </Link>
                <div className="panel panel-primary mt-50">
                    <div className="panel-heading">
                        <h3 className="panel-title">Danh sách sản phẩm</h3>
                    </div>
                    <ProductList>
                        { this.showProducts(products) }
                    </ProductList>
                </div>
            </div>
        )
    }
    showProducts = (products) => {
        var result = null;
        if(products.length > 0) {
            result = products.map((product, index) => {
                return (
                    <ProductItem
                        key={index}
                        product={product}
                        index={index}
                        onDelete={ this.onDelete }
                    />
                )
            })
        }
        return result;
    }
}
 
const mapStateToProps = state => {
    return {
        products: state.products
    }
}

const mapDispatchToProps = (dispatch, props) => {
    return {
        fetchAllProducts: () => {
           dispatch(actFetchProductsRequest());
        },
        fetchDeleteProduct: (id) => {
            dispatch(actDeleteProductRequest(id))
        }
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(ProductListPage);