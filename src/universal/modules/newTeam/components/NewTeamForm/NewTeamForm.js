import PropTypes from 'prop-types';
import React from 'react';
import FontAwesome from 'react-fontawesome';
import withStyles from 'universal/styles/withStyles';
import {css} from 'aphrodite-local-styles/no-important';
import ui from 'universal/styles/ui';
import appTheme from 'universal/styles/theme/appTheme';
import Button from 'universal/components/Button/Button';
import Panel from 'universal/components/Panel/Panel';
import Radio from 'universal/components/Radio/Radio';
import FieldLabel from 'universal/components/FieldLabel/FieldLabel';
import InputField from 'universal/components/InputField/InputField';
import {randomPlaceholderTheme} from 'universal/utils/makeRandomPlaceholder';
import {Field, reduxForm} from 'redux-form';
import DropdownInput from 'universal/modules/dropdown/components/DropdownInput/DropdownInput';
import makeAddTeamSchema from 'universal/validation/makeAddTeamSchema';
import addOrgSchema from 'universal/validation/addOrgSchema';
import CreditCardModalContainer from 'universal/modules/userDashboard/containers/CreditCardModal/CreditCardModalContainer';
import FieldBlock from 'universal/components/FieldBlock/FieldBlock';
import {MONTHLY_PRICE} from 'universal/utils/constants';
import StripeTokenField from 'universal/modules/newTeam/components/NewTeamForm/StripeTokenField';
import TextAreaField from 'universal/components/TextAreaField/TextAreaField';

const validate = (values, props) => {
  const {isNewOrg} = props;
  const schema = isNewOrg ? addOrgSchema() : makeAddTeamSchema();
  return schema(values).errors;
};

const NewTeamForm = (props) => {
  const {
    change,
    handleSubmit,
    last4,
    isNewOrg,
    organizations,
    history,
    setLast4,
    styles
  } = props;

  const setToken = (stripeToken, myLast4) => {
    setLast4(myLast4);
    change('stripeToken', stripeToken);
  };

  const handleCreateNew = () => {
    history.push('/newteam/1');
  };
  const addBilling = <Button colorPalette="cool" isBlock label="Add Billing Information" buttonSize="medium" />;
  const resetOrgSelection = () => {
    history.push('/newteam');
  };
  const radioBaseStyles = {
    color: ui.palette.dark
  };
  const controlSize = 'medium';
  return (
    <form className={css(styles.form)} onSubmit={handleSubmit}>
      <Panel label="Create a New Team">
        <div className={css(styles.formInner)}>
          {isNewOrg ?
            <div className={css(styles.formBlock)}>
              <Field
                colorPalette="gray"
                component={InputField}
                label="Organization Name"
                name="orgName"
                placeholder={randomPlaceholderTheme.orgName}
              />
              <FieldBlock>
                <div className={css(styles.billingBlock)}>
                  <h3 className={css(styles.billingHeading)}>Billing information (required)</h3>
                  <div className={css(styles.billingCopy)}>
                    Your card will be charged ${MONTHLY_PRICE} for the first month.
                    The members that you invite will be prorated on their
                    join date and added to your second invoice.
                  </div>
                  <Field
                    component={StripeTokenField}
                    name="stripeToken"
                  />
                  {last4 === undefined ?
                    <div className={css(styles.billingButtonBlock)}>
                      <CreditCardModalContainer
                        handleToken={setToken}
                        toggle={addBilling}
                      />
                      <div className={css(styles.cancelNewOrgButtonBlock)}>
                        <Button
                          colorPalette="dark"
                          isBlock
                          label="Nevermind, select an existing organization"
                          onClick={resetOrgSelection}
                          buttonSize="small"
                          buttonStyle="flat"
                        />
                      </div>
                    </div> :
                    <div className={css(styles.cardInfoBlock)}>
                      <div className={css(styles.fill)}>
                        <FontAwesome name="credit-card" />
                        <div className={css(styles.cardInfoLabel)}>Info added for <b>{last4}</b></div>
                      </div>
                      <CreditCardModalContainer
                        isUpdate
                        handleToken={setToken}
                        toggle={<Button colorPalette="cool" label="Update" buttonSize="small" buttonStyle="flat" />}
                      />

                    </div>
                  }
                </div>
              </FieldBlock>
            </div>
            :
            <div>
              <div className={css(styles.formBlock)}>
                <FieldLabel
                  fieldSize={controlSize}
                  indent
                  label="Add Team to…"
                />
              </div>
              <div className={css(styles.formBlock)}>
                <Radio
                  customStyles={radioBaseStyles}
                  fieldSize={controlSize}
                  indent
                  inline
                  label="an existing organization:"
                  group="orgRadioGroup"
                />
                <div className={css(styles.fieldBlock)}>
                  <Field
                    colorPalette="gray"
                    component={DropdownInput}
                    fieldSize={controlSize}
                    handleCreateNew={handleCreateNew}
                    name="orgId"
                    organizations={organizations}
                  />
                </div>
              </div>
              <div className={css(styles.formBlock)}>
                <Radio
                  customStyles={radioBaseStyles}
                  fieldSize={controlSize}
                  indent
                  inline
                  label="a new organization:"
                  group="orgRadioGroup"
                />
                <div className={css(styles.fieldBlock)}>
                  <Field
                    colorPalette="gray"
                    component={InputField}
                    fieldSize={controlSize}
                    name="orgName"
                    placeholder={randomPlaceholderTheme.orgName}
                  />
                </div>
              </div>
            </div>
          }
          <div className={css(styles.formBlock, styles.formBlockInline)}>
            <FieldLabel
              fieldSize={controlSize}
              htmlFor="teamName"
              indent
              inline
              label="Team Name"
            />
            <div className={css(styles.fieldBlock)}>
              <Field
                colorPalette="gray"
                component={InputField}
                fieldSize={controlSize}
                name="teamName"
                placeholder={randomPlaceholderTheme.teamName}
              />
            </div>
          </div>
          <div className={css(styles.textAreaBlock)}>
            <Field
              component={TextAreaField}
              fieldSize={controlSize}
              name="inviteesRaw"
              label="Invite Team Members (optional)"
              placeholder={randomPlaceholderTheme.emailMulti}
            />
          </div>
          <Button
            colorPalette="warm"
            depth={1}
            isBlock
            label="Create Team"
            buttonSize={controlSize}
            type="submit"
          />
        </div>
      </Panel>
    </form>
  );
};

NewTeamForm.propTypes = {
  change: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  last4: PropTypes.string,
  isNewOrg: PropTypes.bool,
  organizations: PropTypes.array,
  history: PropTypes.object.isRequired,
  setLast4: PropTypes.func.isRequired,
  styles: PropTypes.object
};

const styleThunk = () => ({
  form: {
    margin: 0,
    maxWidth: '38rem',
    padding: '.5rem 2rem',
    width: '100%'
  },

  formInner: {
    borderTop: `.0625rem solid ${ui.panelBorderColor}`,
    padding: '2rem'
  },

  formBlock: {
    alignItems: 'flex-start',
    display: 'flex',
    justifyContent: 'space-between',
    margin: '0 auto 1rem',
    width: '100%'
  },

  formBlockInline: {
    marginTop: '3rem'
  },

  fieldBlock: {
    width: '14rem'
  },

  textAreaBlock: {
    margin: '2rem auto'
  },

  billingBlock: {
    border: `1px solid ${appTheme.palette.mid30l}`,
    background: appTheme.palette.light50l,
    boxShadow: ui.shadow[0],
    color: appTheme.palette.dark50d,
    margin: '1rem 0',
    padding: '.75rem .75rem .5rem'
  },

  billingHeading: {
    fontSize: appTheme.typography.sBase,
    fontWeight: 700,
    margin: '0 0 .125rem'
  },

  billingCopy: {
    fontSize: appTheme.typography.s2,
    lineHeight: appTheme.typography.s4
  },

  billingButtonBlock: {
    margin: '1rem 0 0'
  },

  cancelNewOrgButtonBlock: {
    paddingTop: '.5rem'
  },

  cardInfoBlock: {
    alignItems: 'center',
    backgroundColor: '#fff',
    border: `.0625rem solid ${appTheme.palette.mid30l}`,
    borderRadius: ui.borderRadiusSmall,
    color: appTheme.palette.dark,
    display: 'flex',
    fontSize: appTheme.typography.s3,
    margin: '1rem 0 .25rem',
    paddingLeft: '.75rem'
  },

  fill: {
    alignItems: 'center',
    display: 'flex',
    flex: 1
  },

  cardInfoLabel: {
    marginLeft: '.5rem'
  }
});

export default reduxForm({form: 'newTeam', validate})(
  withStyles(styleThunk)(
    NewTeamForm)
);
