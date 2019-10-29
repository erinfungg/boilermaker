import React, { Component } from "react";
import { connect } from "react-redux";

class Sample extends Component {
	render() {
		return <div>sample component</div>;
	}
}

export default connect(
	mapState,
	mapDispatch
)(Sample);
