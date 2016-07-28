import React from 'react';
import {
  Editor,
  EditorState,
  RichUtils,
  DefaultDraftBlockRenderMap,
  Immutable
} from 'draft-js';

const allowedNumericValues = /^[0-9]{1,}$/;

class PaymentStatus extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      total: 0,
      balance: 0,
      result: '',
      purchase: false
    };

    this.purchaseMessages = {
      purchaseOrder: 'Purchase Order',
      paymentInFull: 'Payment in full',
      noPaymentReceived: 'No payment received',
      partGreater: 'Partial payment greater than 50%',
      partLess: 'Partial payment less than 50%'
    };

    this.onBalanceChange = (balance) => {
      this.setState({balance}, () => this.props.onChange(this.state));
    };
    this.onTotalChange = (total) => {
      this.setState({total}, () => this.props.onChange(this.state));
    };
    this.onTogglePurchase = (purchase) => {
      this.setState({purchase}, () => this.props.onChange(this.state));
    };

    this.onTogglePurchase.bind(this);
    this.onTotalChange.bind(this);
    this.onBalanceChange.bind(this);
  }

  mapBussinesRules(state) {
    let hideTotal = false,
      hideBalance = false,
      result = '',
      balance = parseInt(state.balance, 10),
      total = parseInt(state.total, 10);

    if (state.purchase) {
      hideTotal = true;
      hideBalance = true;
      result = this.purchaseMessages.purchaseOrder;
    } else {
      if (balance === 0 && total === 0) {
        result = this.purchaseMessages.noPaymentReceived;
      } else if (balance === 0) {
        result = this.purchaseMessages.paymentInFull;
      } else if ((balance / total) * 100 <= 50) {
        result = this.purchaseMessages.partGreater;
      } else if ((balance / total) * 100 > 50) {
        result = this.purchaseMessages.partLess;
      }
    }

    return Object.assign(state, {
      hideTotal,
      hideBalance,
      result
    });
  }

  render() {
    const { hideTotal, hideBalance, total, balance, result, purchase } = this.mapBussinesRules(this.state);
    const totalBalanceStyles = {
      display: 'flex'
    };

    return (
      <div className="PaymentStatus-root">
        <PurchaseField
          purchase={purchase}
          onToggle={this.onTogglePurchase}
        />
        <div style={totalBalanceStyles}>
          <TotalField
            total={total}
            hide={hideTotal}
            onChange={this.onTotalChange}
          />
          <BalanceField
            balance={balance}
            hide={hideBalance}
            onChange={this.onBalanceChange}
          />
        </div>
        <ResultField
          result={result}
        />
      </div>
    );
  }
}

class PurchaseField extends React.Component {
  constructor() {
    super();
    this.onToggle = (e, checked) => {
      this.props.onToggle(!this.props.purchase);
    };
  }

  render() {
    return (
      <div>
        <span className="PaymentStatus-purchaseOrder--label control-label">Purchase Order</span>
        <div className="PaymentStatus-purchaseOrder--field"><input type="checkbox" checked={this.props.purchase} onChange={this.onToggle} /></div>
      </div>
    );
  }
}

class BalanceField extends React.Component {
  constructor() {
    super();
    this.onChange = (e) => {
      if (allowedNumericValues.test(e.currentTarget.value)) {
        this.props.onChange(e.currentTarget.value);
      } else {
        return false;
      }
    };
  }

  render() {
    if (this.props.hide) {
      return null;
    }
    return (
      <div  style={{flex: 1, marginLeft: '5px'}}>
        <span className="PaymentStatus-balance--label control-label">Balance</span>
        <div className="PaymentStatus-balance--field"><input type="number" min="0" className="form-control" value={this.props.balance} onChange={this.onChange} /></div>
      </div>
    );
  }
}

class TotalField extends React.Component {
  constructor() {
    super();
    this.onChange = (e) => {
      if (allowedNumericValues.test(e.currentTarget.value)) {
        this.props.onChange(e.currentTarget.value);
      } else {
        return false;
      }
    };
  }

  render() {
    if (this.props.hide) {
      return null;
    }
    return (
      <div style={{flex: 1}}>
        <span className="PaymentStatus-total--label control-label">Total</span>
        <div className="PaymentStatus-total--field"><input type="number" min="0" className="form-control" value={this.props.total} onChange={this.onChange} /></div>
      </div>
    );
  }
}

class ResultField extends React.Component {
  render() {
    return (
      <div>
        <span className="PaymentStatus-result--label control-label">Payment Status</span>
        <div className="PaymentStatus-result--field"><input type="text" className="form-control" disabled="true" value={this.props.result} /></div>
      </div>
    );
  }
}
export default PaymentStatus;
