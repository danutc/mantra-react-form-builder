import React from 'react';
import {
  Editor,
  EditorState,
  RichUtils,
  DefaultDraftBlockRenderMap,
  Immutable
} from 'draft-js';

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
      this.setState({balance});
    };
    this.onBalanceBlur = (balance) => {
      balance = this.parseFloatBussinesValues(balance);
      this.setState({balance}, () => this.props.onChange(this.prepareExternalState(this.state)));
    };
    this.onTotalChange = (total) => {
      this.setState({total});
    };
    this.onTotalBlur = (total) => {
      total = this.parseFloatBussinesValues(total);
      this.setState({total}, () => this.props.onChange(this.prepareExternalState(this.state)));

    };
    this.onTogglePurchase = (purchase) => {
      this.setState({purchase}, () => this.props.onChange(this.prepareExternalState(this.state)));
    };

    this.onTogglePurchase.bind(this);
    this.onTotalChange.bind(this);
    this.onBalanceChange.bind(this);
  }

  parseFloatBussinesValues(value, render = false) {
    if (typeof value === 'string') {
      value = value.replace(/,/g, '');
    }

    value = parseFloat(value);

    if (isNaN(value)) {
      value = 0;
    }

    if (render || !value) {
      return value;
    }

    value = value.toFixed(2)
      .toString()
      .replace(/\B(?=(\d{3})+(?!\d))/g, ",");

    return value;
  }

  prepareExternalState(state) {
    let clonnedState = JSON.parse(JSON.stringify(state));
    clonnedState.balance = this.parseFloatBussinesValues(clonnedState.balance, true);
    clonnedState.total = this.parseFloatBussinesValues(clonnedState.total, true);

    return clonnedState;
  }

  mapBussinesRules(state) {
    let hideTotal = false,
      hideBalance = false,
      paymentStatus = '',
      balance = this.parseFloatBussinesValues(state.balance, true),
      total = this.parseFloatBussinesValues(state.total, true);

    if (state.purchase) {
      hideTotal = true;
      hideBalance = true;
      paymentStatus = this.purchaseMessages.purchaseOrder;
    } else {
      if ((balance == 0 && total == 0) || balance == total) {
        paymentStatus = this.purchaseMessages.noPaymentReceived;
      } else if (balance == 0) {
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
            onBlur={this.onTotalBlur}
          />
          <BalanceField
            balance={balance}
            hide={hideBalance}
            onChange={this.onBalanceChange}
            onBlur={this.onBalanceBlur}
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
      this.props.onChange(e.currentTarget.value);
    };
    this.onBlur = (e) => {
      this.props.onBlur(e.currentTarget.value);
    };
  }

  render() {
    if (this.props.hide) {
      return null;
    }
    return (
      <div  style={{flex: 1, marginLeft: '5px'}}>
        <span className="PaymentStatus-balance--label control-label">Balance</span>
        <div className="PaymentStatus-balance--field"><input type="text" className="form-control" value={this.props.balance} onChange={this.onChange} onBlur={this.onBlur} /></div>
      </div>
    );
  }
}

class TotalField extends React.Component {
  constructor() {
    super();
    this.onChange = (e) => {
      this.props.onChange(e.currentTarget.value);
    };
    this.onBlur = (e) => {
      this.props.onBlur(e.currentTarget.value);
    };
  }

  render() {
    if (this.props.hide) {
      return null;
    }
    return (
      <div style={{flex: 1}}>
        <span className="PaymentStatus-total--label control-label">Total</span>
        <div className="PaymentStatus-total--field"><input type="text" className="form-control" value={this.props.total} onChange={this.onChange} onBlur={this.onBlur} /></div>
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
