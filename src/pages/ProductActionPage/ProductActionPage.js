import React, { Component } from 'react';
import callApi from '../../utils/apiCaller';
import { Link } from 'react-router-dom';

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
		var { match } = this.props;
		var { id }  = match.params;
		callApi(`products/${id}`, 'GET', null).then(res => {
			var data = res.data;
			this.setState({
				id: data.id,
				txtName: data.name,
				txtPrice: data.price,
				ckbStatus: data.status
			})
		})
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
			var { 	
					state : {
						id,
						txtName,
						txtPrice,
						ckbStatus
					},
					props : {
						history
					}		
				} = this;
		ckbStatus = ckbStatus === "" ? false : ckbStatus;
		if(id) {
			callApi(`products/${id}`, 'PUT', {
				name: txtName,
				price: txtPrice,
				status: ckbStatus
			}).then(res => {
				history.goBack();
			})
		}else {
			callApi('products', 'POST', {
				name: txtName,
				price: txtPrice,
				status: ckbStatus
			}).then(res => {
				history.goBack();
			})
		}
	}

    render() {
		var {
			state: {
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

export default ProductActionPage;