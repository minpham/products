import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { actAddProductRequest, actItemEditingRequest, actUpdateProductRequest } from '../../actions/index';

class ProductActionPage extends Component {
	constructor(props) {
		super(props);
		this.state = {
			id: '',
			txtName: '',
			txtPrice: '',
			ckbStatus: ''
		}
	}
	
	componentDidMount() {
		var { match, onGetProduct } = this.props;
		if(match) {
			var { id }  = match.params;
			onGetProduct(id);
		}
	}

	componentWillReceiveProps(nextProps) {
		if(nextProps && nextProps.itemEditing) {
			var { itemEditing } = nextProps;
				this.setState({
				id: itemEditing.id,
				txtName: itemEditing.name,
				txtPrice: itemEditing.price,
				ckbStatus: itemEditing.status
			})
		}
	}

	onChange = (e) => {
		var target = e.target;
		var name = target.name;
		var value = target.type === 'checkbox' ? target.checked : target.value;
		this.setState({
			[name]: value
		})
	}

	onSave = (e) => {
		e.preventDefault();
		var { id, txtName, txtPrice, ckbStatus } = this.state;
		var { history, onAddProduct, onUpdateProduct } = this.props;
		ckbStatus = ckbStatus === "" ? false : ckbStatus;
		var product = {
			id: id,
			name: txtName,
			price: txtPrice,
			status: ckbStatus
		}
		if(id) {
			onUpdateProduct(product);
		} else {
			if(product.name !== "" && product.price !== "") onAddProduct(product);
		}
		history.goBack();
	}

    render() {
		var { state: {
				txtName,
				txtPrice,
				ckbStatus,
			},
			onChange,
			onSave
			} = this;
        return (
            <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                <form onSubmit={onSave}>
                	<div className="form-group">
                		<label>Tên sản phẩm:</label>
                		<input 
				
							type="text" 
							className="form-control" 
							name="txtName"
							value={txtName}
							onChange={onChange}
						/>
                	</div>
                    <div className="form-group">
                		<label>Giá:</label>
                		<input 
						
							type="text" 
							className="form-control" 
							name="txtPrice"
							value={txtPrice}
							onChange={onChange}
						/>
                	</div>
                    <div className="form-group">
                		<label>Trạng thái</label>
                	</div>
                	<div className="checkbox">
                		<label>
                			<input 
								type="checkbox" 
								name="ckbStatus"
								value={ckbStatus}
								checked={ckbStatus}
								onChange={onChange}
							/>
                			Còn hàng
                		</label>
                	</div>
                	<button type="submit" className="btn btn-primary">Lưu lại</button>&nbsp;
					<Link to="/product-list" className="btn btn-warning">
						Trở lại
					</Link>
                </form>
            </div>
        )
    }
}

const mapStateToProps = state => {
	return {
		itemEditing: state.itemEditing
	}
}

const mapDispatchToProps = (dispatch, props) => {
	return {
		onAddProduct: (product) => {
			dispatch(actAddProductRequest(product));
		},
		onGetProduct: (product) => {
			dispatch(actItemEditingRequest(product));
		},
		onUpdateProduct: (product) => {
			dispatch(actUpdateProductRequest(product));
		}
	}
}
export default connect(mapStateToProps, mapDispatchToProps)(ProductActionPage);