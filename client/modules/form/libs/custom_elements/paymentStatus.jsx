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
      result: '',
      purchase: false
    };

    this.purchaseMessages = {
      purchaseOrder: 'Purchase Order',
      paymentInFull: 'Payment in full',
      partGreater: 'Part payment greater than 50',
      partLess: 'Part payment less than 50'
    };

    this.onChange = (state) => this.setState(state);
    this.onBalanceChange = (balance) => this.setState({balance});
    this.onTotalChange = (total) => this.setState({total});
    this.onTogglePurchase = (purchase) => this.setState({purchase});
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
      if (balance === 0) {
        result = this.purchaseMessages.paymentInFull;
      } else if ((balance / 100) * total <= 50) {
        result = this.purchaseMessages.partGreater;
      } else if ((balance / 100) * total  > 50) {
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
    console.log(this.state);
    const { hideTotal, hideBalance, total, balance, result, purchase } = this.mapBussinesRules(this.state);

    return (
      <div className="PaymentStatus-root">
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
        <ResultField
          result={result}
        />
        <PurchaseField
          purchase={purchase}
          onToggle={this.onTogglePurchase}
        />
      </div>
    );
  }
}

class PurchaseField extends React.Component {
  constructor() {
    super();
    this.onToggle = (e) => {
      e.preventDefault();
      this.props.onToggle(!this.props.purchase);
    };
  }

  render() {
    return (
      <span>
        <span className="PaymentStatus-purchaseOrder--label">Purchase Order:</span>
        <span className="PaymentStatus-purchaseOrder--field"><input type="checkbox" checked={this.props.purchase} onChange={this.onToggle} /></span>
      </span>
    );
  }
}

class BalanceField extends React.Component {
  constructor() {
    super();
    this.onChange = (e) => {
      this.props.onChange(e.currentTarget.value);
    };
  }

  render() {
    if (this.props.hide) {
      return null;
    }
    return (
      <span>
        <span className="PaymentStatus-balance--label">Balance:</span>
        <span className="PaymentStatus-balance--field"><input type="text" value={this.props.balance}  onChange={this.onChange} /></span>
      </span>
    );
  }
}

class TotalField extends React.Component {
  constructor() {
    super();
    this.onChange = (e) => {
      this.props.onChange(e.currentTarget.value);
    };
  }

  render() {
    if (this.props.hide) {
      return null;
    }
    return (
      <span>
        <span className="PaymentStatus-total--label">Total:</span>
        <span className="PaymentStatus-total--field"><input type="text" value={this.props.total} onChange={this.onChange} /></span>
      </span>
    );
  }
}

class ResultField extends React.Component {
  render() {
    return (
      <span>
        <span className="PaymentStatus-result--label">Result:</span>
        <span className="PaymentStatus-result--field"><input type="text" readonly value={this.props.result} /></span>
      </span>
    );
  }
}
export default PaymentStatus;
