import { LabelsLeftLayout, LabelsTopLayout, LabelsTopLayoutCell } from 'cx/ui';
import { Button, LabeledContainer, LookupField, TextArea, TextField, ValidationGroup } from 'cx/widgets';
import { GET } from '../../api/util/methods';
import Controller from './Controller';

export default (
    <cx>
        <div controller={Controller}>
            <div class="p-8" class="mb-10">
                <div>Section 1</div>
                <ValidationGroup /*invalid-bind="$page.invalid" */ /*disabled - disabled everything within the group*/>
                    <LabelsLeftLayout columns={3}>
                        <TextField
                            label="Username"
                            value-bind="$page.username" /* required */ /*validationMode="help-block" */
                        />
                        <TextField label="Password" value-bind="$page.password" required />

                        <Button onClick="onLogin" /* disabled-bind="$page.invalid" */>Sign In</Button>
                    </LabelsLeftLayout>
                </ValidationGroup>

                <ValidationGroup invalid-bind="$page.invalid">
                    <LabelsLeftLayout columns={3}>
                        <TextField
                            label="Username"
                            value-bind="$page.username"
                            required
                            validationMode="help-block"
                            visited-bind="$page.visited"
                        />
                        <TextField
                            label="Password"
                            value-bind="$page.password"
                            required
                            visited-bind="$page.visited"
                            //validationMode
                            minLength={6}
                        />
                        <Button onClick="onLogin">Sign In</Button>
                    </LabelsLeftLayout>
                </ValidationGroup>

                <ValidationGroup invalid-bind="$page.pass.invalid" visited-bind="$page.pass.visited">
                    <LabelsLeftLayout columns={3}>
                        <TextField
                            label="change pass"
                            value-bind="$page.pass.password"
                            required
                            validationMode="help-block"
                            inputType="password"
                            onValidate={(value) => {
                                //some logic for validating, return false means it's good
                                let digits = false;
                                let alphas = false;
                                for (let i = 0; i < value.length; i++) {
                                    let c = value[i];
                                    if (c >= '0' && c <= '9') digits = true;
                                    if (c >= 'a' && c <= 'z') alphas = true;
                                }
                                if (!alphas) return 'Alphas missing';
                                if (!digits) return 'Passwords should contain at least one digit';
                                return false;
                                //validationRegExp={/abc/}
                                //validationErrorText='password should be abc elemenoPee
                            }}
                        />
                        <TextField
                            label="enter again"
                            value-bind="$page.pass.confirmPassword"
                            required
                            inputType="password"
                            validationParams={{
                                //can forward this as argument to the onValidate below, can put as much keys as we want
                                password: { bind: '$page.pass.password' },
                            }}
                            onValidate={(value, { store }, params) => {
                                //let newPass = store.get('$page.pass.password');
                                if (/* newPass */ params.password != value) return 'passwords do not mtach!';
                                return false;
                            }}
                        />
                        <Button onClick="onLogin" disabled-bind="$page.invalid">
                            Sign In
                        </Button>
                    </LabelsLeftLayout>
                </ValidationGroup>
            </div>

            <div
                class="widgets"
                style={{
                    borderLeftWidth: '3px',
                    borderLeftStyle: 'solid',
                    borderLeftColor: { expr: '{$validationForm.valid} ? "lightgreen" : "red"' },
                    padding: '10px',
                }}
            >
                <ValidationGroup layout={LabelsLeftLayout} valid:bind="$validationForm.valid">
                    <TextField label="First Name" value:bind="$validationForm.firstName" required />
                    <TextField label="Last Name" value:bind="$validationForm.lastName" required />
                </ValidationGroup>
            </div>

            <br />
            <LookupField
                label="Options"
                value-bind="$page.currency" //one of the id's will be the value in the store
                options={[
                    //value of text key will be shown as an option on the page
                    { id: 'BAM', text: 'Konvertibilna marka' },
                    { id: 'EUR', text: 'Evro' },
                ]}
            />
            <LookupField
                label="OptionsMltpl"
                multiple //allow multiple choices, when not put as attr, it does not work
                values-bind="$page.currencyMltpl" //put values for more options, stores id's in array //tried using value-bind insted of values-bind, doesn't work
                options={[
                    { id: 'BAM', text: 'Konvertibilna marka' },
                    { id: 'EUR', text: 'Evro' },
                ]}
                labelStyle="margin-left: 10px"
            />
            <br />
            <LookupField
                label="OptionsFull"
                multiple
                records-bind="$page.currencies" //records enables storage of options as they are presented - like objects below with all data included
                options={[
                    { id: 'BAM', text: 'Konvertibilna marka' },
                    { id: 'EUR', text: 'Evro' },
                ]}
            />
            <LookupField
                label="Options/name"
                multiple
                records-bind="$page.currName"
                optionTextField="whateverYouWant"
                options={[
                    { id: 'BAM', whateverYouWant: 'Marka' },
                    { id: 'EUR', whateverYouWant: 'Evar' },
                ]}
                labelStyle="margin-left: 10px"
            />
            <br />
            <LookupField /* going to the server only when user wants to see all options */
                label="text-bind"
                value-bind="$page.bindValue_id" //id
                text-bind="$page.bindText_text" //text //not needed when it's hardcoded, important when retrieving from server so we can store the text
                options={[
                    { id: 'shitcoin', text: 'shitcoin dollar' },
                    { id: 'rsd', text: 'dinar' },
                ]}
            />
            <LabelsLeftLayout>
                <LookupField
                    label="getting from server" /*loading from data/products */
                    value-bind="$page.serverMock_valueBind" // some value from the server
                    text-bind="$page.serverMock_textBind" //
                    optionTextField="unitPrice" //check products to see what can be used(there's id and unitPrice).
                    /*onQuery loads when dropdown is clicked*/
                    onQuery={async (query) => {
                        let data = await GET('products'); //no query for this particular API (productEndpoints) in products.js
                        return data;
                    }}
                    fetchAll //load on first click, so we don't pull from the server each time
                />
            </LabelsLeftLayout>

            <div class="mt-15 p-8">
                <LabelsTopLayout columns={3}>
                    <TextField label="Username" value-bind="$page.username" required />
                    <TextField label="Password" value-bind="$page.password" required />
                    <TextField label="Username" value-bind="$page.username" required />
                    <TextField label="Password" value-bind="$page.password" required />

                    <LabelsTopLayoutCell colSpan={2} rowSpan={3}>
                        <TextArea
                            label="text field weee!"
                            value-bind="$page.textField"
                            required
                            rows={8}
                            class="w-full"
                        />
                    </LabelsTopLayoutCell>

                    <TextField label="Username" value-bind="$page.username" required />
                    <TextField label="Password" value-bind="$page.password" required />

                    <TextField label="Username" value-bind="$page.username" required />
                    <TextField label="Password" value-bind="$page.password" required />

                    <TextField label="Username" value-bind="$page.username" required />
                    <TextField label="Password" value-bind="$page.password" required />
                    <TextField label="Username" value-bind="$page.username" required />
                    <TextField label="Password" value-bind="$page.password" required />
                    <TextField label="Username" value-bind="$page.username" required />
                    <TextField label="Password" value-bind="$page.password" required />
                </LabelsTopLayout>
            </div>
        </div>
    </cx>
);
