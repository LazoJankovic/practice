import Controller from './Controller';
import { Button, Icon, Repeater } from 'cx/widgets';

export const KPI = ({ icon, name, value, iconColor }) => (
    <cx>
        <div class="bg-white rounded-lg drop-shadow-xl text-gray-500 overflow-hidden bg-gradient-to-br from-yellow-400 via-red-500 to-pink-500">
            <div class="flex items-center pt-4 pb-5 px-1">
                <Icon name={icon} class="w-6 h-6 mx-5" className={iconColor} />
                {/* bg-yellow-200 bg-opacity-60 */}
                <div>
                    <div text={name} class="text-black  text-opacity-80" />
                    <div text={value} class="text-2xl text-black font-bold" />
                </div>
            </div>
            <div class="bg-gray-50 px-5 py-3">
                <a href="#" class="text-blue-600">
                    View all
                </a>
            </div>
        </div>
    </cx>
);

const tr = 'bg-white border-b-2 text-gray-600 h-8';
export default (
    <cx>
        <div controller={Controller} class="bg-gray-100 min-h-full">
            {/* Header */}
            <div class="flex items-center bg-white px-8 py-4 shadow">
                <img
                    class="rounded-full w-16 h-16 object-cover object-top"
                    src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80"
                />
                <div class="ml-4">
                    <div class="text-2xl font-bold">Good morning, Emilia Birch</div>
                    <div class="mt-1 text-gray-500 flex items-center">
                        <Icon name="office-building" class="w-5 h-5 mr-2" /> Duke Street Studio
                        <Icon name="check-circle-solid" class="w-5 h-5 ml-4 mr-2 text-green-500" /> Verified Account
                    </div>
                </div>
                <Button class="ml-auto">Add money</Button>
                <Button class="ml-2" mod="primary">
                    Send money
                </Button>
            </div>

            <div class="p-8 w-[1000px]">
                {/* KPIs */}
                <h3 class="text-xl mb-3">Overview</h3>

                <div class="mt-2 grid grid-cols-3 gap-6">
                    <KPI icon="scale" iconColor="text-yellow-900" name="Account Balance" value="$30,659.23" />
                    <KPI iconColor="text-blue-500" icon="refresh" name="Pending" value="-$19,500.00" />
                    <KPI
                        icon="check-circle"
                        iconColor="text-green-600"
                        name="Processed (last 30 days)"
                        value="$20,000"
                    />
                </div>

                {/* Transactions table */}
                <h3 class="text-xl mb-3 mt-10">Recent Activity</h3>

                <table class="w-full rounded-xl overflow-hidden drop-shadow-xl ">
                    <thead>
                        <tr class="text-left bg-gray-200 text-gray-500 ">
                            <th class="pl-6 py-2 w-80 ">TRANSACTION</th>
                            <th>AMOUNT</th>
                            <th>STATUS</th>
                            <th>DATE</th>
                        </tr>
                    </thead>
                    <tbody>
                        <Repeater records:bind="$payments" recordAlias="$tran">
                            <tr className={tr}>
                                <td class="pl-6 py-4">
                                    <Icon name="cash-solid" />
                                    <span text-tpl="Payment to {$tran.name}" class="pl-2"></span>
                                </td>

                                <td>
                                    <span class="font-bold" text-tpl="${$tran.value} "></span>
                                    USD
                                </td>

                                <td class="pb-0.5">
                                    <span
                                        text-tpl="{$tran.status}"
                                        class={{
                                            'rounded-lg': true,
                                            'px-1': true,
                                            //'py-0.5': true,
                                            'pb-0.5': true,
                                            'text-center': true,
                                            'text-gray-500': true,
                                            /* 'bg-green-400': { bind: '$tran' === 'incorrect string' }, I tried like this*/
                                            'bg-green-300': { expr: '{$tran.status}=="Success"' },
                                        }}
                                    ></span>
                                </td>

                                <td text-tpl="{$tran.date}"></td>
                            </tr>
                        </Repeater>
                    </tbody>
                </table>
            </div>
        </div>
    </cx>
);
