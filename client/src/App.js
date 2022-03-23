import React, { useState, useEffect } from 'react';
import featureApi from './api/feature.js';
import planApi from './api/plan.js';

import './assets/css/App.css';
import checkIcon from './assets/images/check.png';
import closeIcon from './assets/images/close.png';

function App() {
  const [loading, setLoading] = useState(true)
  const [features, setFeatures] = useState([])
  const [plans, setPlans] = useState([])
  const [selectedPlan, setSelectedPlan] = useState(1)

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    setLoading(true)
    const getFeatures = await featureApi.getFeatureList()
    const getPlan = await planApi.getPlanList()

    setFeatures(getFeatures.data)
    setPlans(getPlan.data)
    setSelectedPlan(getPlan.data.length > 0 ? getPlan.data[0].id : null)
    setLoading(false)
  }

  const featureList = () => {
    const listItems = features.map((feature) => (
      <div className="feature-items" key={ feature.id }>{feature.feature_name}</div>
    ));
    return (
      <div className="feature-wrapper">{listItems}</div>
    );
  }

  const planList = () => {
    const listItems = plans.map((plan) => {
      const listPlanFeature = plan.features.map(item => item.id)
      const featureList = features.map(feature => {
        const icon = listPlanFeature.indexOf(feature.id) !== -1 ? checkIcon : closeIcon

        return (
          <div className="plan-items" key={ 'feature_' + feature.id }>
            <img className="plan-items-img" src={icon} alt="plan icon" />
          </div>
        )
      })

      const isSelectedPlan = plan.id === selectedPlan

      return (
        <div className="plan-card" key={ plan.id }>
          <p className="plan-title">{ plan.plan_name }</p>
          <div className="plan-item-wrapper">
            { featureList }
          </div>
          <div className="plan-price-wrapper">
            <input className="price-radio" type="radio" name="price-radio" checked={isSelectedPlan} onClick={() => setSelectedPlan(plan.id)} readOnly />
            <p className="plan-price-title">HK${ plan.plan_price }<span>/Month</span></p>
          </div>
        </div>
      )
    });
    return (
      <div className="plan-wrapper">
        {listItems}
      </div>
    );
  }

  const loadingElement = () => {
    return loading ? (
      <div className="loading"><div className="lds-ring"><div></div><div></div><div></div><div></div></div></div>
      ) : (
        <div></div>
      )
  }

  return (
    <div className="choose-plan-container">
      <p className="title">Choose a plan</p>
      <div className="plan-container">
        <div className="feature-list">
        { featureList() }
        </div>
        <div className="plan-list">
          { planList() }
        </div>
      </div>
      { loadingElement() }
    </div>
    );
}

export default App;