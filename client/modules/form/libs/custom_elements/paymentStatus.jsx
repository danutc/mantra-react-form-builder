import React from 'react';
import {
  Editor,
  EditorState,
  RichUtils,
  DefaultDraftBlockRenderMap,
  Immutable
} from 'draft-js';

const allowedNumericValues = /^\d+(?:\.\d{0,2})$/;

class PaymentStatus extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      total: 0,
      balance: 0,
      paymentStatus: '',
      purchase: false
    };

    this.purchaseMessages = {
      purchaseOrder: 'Purchase order',
      paymentInFull: 'Payment in full',
      noPaymentReceived: 'No payment received',
      partGreater: 'Partial payment greater than 50%',
      partLess: 'Partial payment less than 50%'
    };

    this.onBalanceChange = (balance) => {
      balance = parseInt(balance, 10);
      this.setState({balance}, () => this.props.onChange(this.state));
    };
    this.onTotalChange = (total) => {
      total = parseInt(total, 10);
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
      paymentStatus = '',
      balance = parseInt(state.balance, 10),
      total = parseInt(state.total, 10);

    if (state.purchase) {
      hideTotal = true;
      hideBalance = true;
      paymentStatus = this.purchaseMessages.purchaseOrder;
    } else {
      if (balance === 0 && total === 0) {
        paymentStatus = this.purchaseMessages.noPaymentReceived;
      } else if (balance === 0) {
        paymentStatus = this.purchaseMessages.paymentInFull;
      } else if ((balance / total) * 100 <= 50) {
        paymentStatus = this.purchaseMessages.partGreater;
      } else if ((balance / total) * 100 > 50) {
        paymentStatus = this.purchaseMessages.partLess;
      }
    }

    return Object.assign(state, {
      hideTotal,
      hideBalance,
      paymentStatus
    });
  }

  render() {
    const { hideTotal, hideBalance, total, balance, paymentStatus, purchase } = this.mapBussinesRules(this.state);
    const totalBalanceStyles = {
      display: 'flex',
      marginTop: '5px'
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
        <PaymentStatusField
          paymentStatus={paymentStatus}
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
        <span className="PaymentStatus-purchaseOrder--field"><input type="checkbox" checked={this.props.purchase} onChange={this.onToggle} /></span>
        <span className="PaymentStatus-purchaseOrder--label control-label" style={{marginLeft: '5px', fontWeight: 'bold'}}>Purchase order</span>
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

class PaymentStatusField extends React.Component {
  render() {
    return (
      <div style={{marginTop: '5px'}}>
        <span className="PaymentStatus-paymentStatus--label control-label">Payment Status</span>
        <div className="PaymentStatus-paymentStatus--field"><input type="text" className="form-control" disabled="true" value={this.props.paymentStatus} /></div>
      </div>
    );
  }
}
export default PaymentStatus;
