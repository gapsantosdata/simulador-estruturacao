<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Simulador de Receita (CRIs)</title>
    
    <!-- Tailwind CSS -->
    <script src="https://cdn.tailwindcss.com"></script>
    
    <!-- Chart.js -->
    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
    
    <!-- FontAwesome -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">

    <style>
        body { font-family: 'Inter', sans-serif; }
        /* Custom range slider styling */
        input[type=range] {
            -webkit-appearance: none; 
            background: transparent; 
        }
        input[type=range]::-webkit-slider-thumb {
            -webkit-appearance: none;
            height: 16px;
            width: 16px;
            border-radius: 50%;
            background: #1d4ed8;
            cursor: pointer;
            margin-top: -6px; 
        }
        input[type=range]::-webkit-slider-runnable-track {
            width: 100%;
            height: 4px;
            cursor: pointer;
            background: #dbeafe;
            border-radius: 2px;
        }
        /* Specific slider color for Sales Desk */
        #rangeSalesSpread::-webkit-slider-thumb {
            background: #059669; /* Emerald 600 */
        }
        #rangeSalesSpread::-webkit-slider-runnable-track {
            background: #a7f3d0; /* Emerald 200 */
        }
        /* Specific slider color for Origination Fee (Purple) */
        #rangeOrigFee::-webkit-slider-thumb {
            background: #7c3aed; /* Violet 600 */
        }
        #rangeOrigFee::-webkit-slider-runnable-track {
            background: #ddd6fe; /* Violet 200 */
        }
    </style>
</head>
<body class="bg-white text-slate-900 p-4 md:p-8 min-h-screen">

    <div class="max-w-7xl mx-auto space-y-8">
        
        <!-- Header -->
        <div class="mb-6">
            <h1 class="text-3xl font-bold text-slate-900 flex items-center gap-3">
                <i class="fa-solid fa-calculator text-blue-700"></i>
                Simulador de Receita (CRIs)
            </h1>
        </div>

        <!-- Inputs Card -->
        <div class="bg-white rounded-2xl shadow-sm border border-blue-100 overflow-hidden">
            <div class="px-6 py-4 border-b border-blue-100 flex items-center gap-2 bg-slate-50/50">
                <i class="fa-solid fa-dollar-sign text-blue-700"></i>
                <h3 class="text-sm font-bold text-slate-800">Premissas do CRI</h3>
            </div>
            
            <div class="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <!-- Volume (Zerado por padrão) -->
                <div>
                    <label class="block text-sm font-medium text-slate-700 mb-1 text-center">Volume (R$)</label>
                    <input type="text" id="inputVolume" class="w-full bg-white border border-blue-200 rounded-xl px-3 py-2 outline-none focus:ring-2 focus:ring-blue-700 text-center font-semibold tabular-nums placeholder-slate-300" value="0,00" placeholder="0,00">
                </div>

                <!-- Prazo (Zerado por padrão) -->
                <div>
                    <label class="block text-sm font-medium text-slate-700 mb-1 text-center">Prazo (meses)</label>
                    <input type="number" id="inputPrazo" class="w-full bg-white border border-blue-200 rounded-xl px-3 py-2 outline-none focus:ring-2 focus:ring-blue-700 text-center font-semibold placeholder-slate-300" value="0" placeholder="0">
                </div>

                <!-- Indexador -->
                <div>
                    <label class="block text-sm font-medium text-slate-700 mb-1 text-center">Indexador</label>
                    <div class="flex gap-2">
                        <select id="selectIndexType" class="w-1/3 bg-white border border-blue-200 rounded-xl px-2 py-2 outline-none focus:ring-2 focus:ring-blue-700 text-center text-sm">
                            <option value="CDI" selected>CDI</option>
                            <option value="IPCA">IPCA</option>
                        </select>
                        <input type="number" id="inputIndexValue" step="0.01" class="w-2/3 bg-white border border-blue-200 rounded-xl px-3 py-2 outline-none focus:ring-2 focus:ring-blue-700 text-center font-semibold" value="15.00">
                    </div>
                    <div id="labelIndexType" class="text-[10px] text-center text-slate-400 mt-1">CDI (a.a. %)</div>
                </div>

                <!-- Fee Bloxs -->
                <div>
                    <label class="block text-sm font-medium text-slate-700 mb-1 text-center">Success Fee BLOXS (%)</label>
                    <div class="border border-blue-200 rounded-xl p-2 bg-slate-50">
                        <input type="range" id="rangeFee" min="2.0" max="5.0" step="0.05" value="2.5" class="w-full">
                        <div class="flex justify-between items-center mt-1 px-1">
                            <span id="displayFee" class="text-sm font-bold text-blue-700">2,50%</span>
                            <label class="flex items-center gap-1 cursor-pointer">
                                <input type="checkbox" id="checkGrossUp" class="w-3 h-3 accent-blue-700 rounded">
                                <span class="text-[10px] text-slate-500 font-medium">Gross-up (16,33%)</span>
                            </label>
                        </div>
                    </div>
                </div>

                <!-- Fee Originação (NOVO - Min 0) -->
                <div>
                    <label class="block text-sm font-medium text-slate-700 mb-1 text-center">Fee de Originação (%)</label>
                    <div class="border border-violet-200 rounded-xl p-2 bg-violet-50">
                        <input type="range" id="rangeOrigFee" min="0" max="2.0" step="0.05" value="0.5" class="w-full">
                        <div class="flex justify-center items-center mt-1 px-1">
                            <span id="displayOrigFee" class="text-sm font-bold text-violet-700">0,50%</span>
                        </div>
                    </div>
                </div>

                <!-- Taxa Indicativa (Antigo Spread Originador) -->
                <div>
                    <label class="block text-sm font-medium text-slate-700 mb-1 text-center">Taxa Indicativa (a.a)</label>
                    <input type="number" id="inputSpreadOrig" step="0.1" value="5.0" class="w-full bg-white border border-blue-200 rounded-xl px-3 py-2 outline-none focus:ring-2 focus:ring-blue-700 text-center font-semibold">
                </div>

                <!-- Taxa de Mercado (Antigo Spread Mercado) -->
                <div>
                    <label class="block text-sm font-medium text-slate-700 mb-1 text-center">Taxa de Mercado (a.a)</label>
                    <input type="number" id="inputSpreadMkt" step="0.1" value="3.0" class="w-full bg-white border border-blue-200 rounded-xl px-3 py-2 outline-none focus:ring-2 focus:ring-blue-700 text-center font-semibold">
                </div>

                <!-- Intervalo -->
                <div>
                    <label class="block text-sm font-medium text-slate-700 mb-1 text-center">Intervalo do gráfico (bps)</label>
                    <input type="number" id="inputStep" step="5" value="25" class="w-full bg-white border border-blue-200 rounded-xl px-3 py-2 outline-none focus:ring-2 focus:ring-blue-700 text-center text-slate-500">
                </div>

                <!-- Destaque One-Off (Total) -->
                <div class="bg-blue-50 border border-blue-200 rounded-xl p-3 flex flex-col justify-center items-center shadow-sm col-span-1 md:col-span-2 lg:col-span-4">
                    <div class="text-xs font-bold text-blue-900 uppercase tracking-wide mb-1 text-center flex items-center gap-1">
                        <i class="fa-solid fa-wallet text-sm"></i>
                        Custos da operação
                    </div>
                    <div id="valOneOffTotalHighlight" class="text-2xl font-bold text-blue-700">R$ 0,00</div>
                    <div id="valOneOffPctHighlight" class="text-sm text-blue-600 font-medium">0,00% do volume</div>
                    <div class="text-[10px] text-blue-400 mt-1 text-center leading-tight">Inclui Custos Tabela + Success Fee + Originação</div>
                </div>
            </div>
        </div>

        <!-- KPIs Grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <!-- Net Proceeds -->
            <div class="bg-white border border-blue-100 rounded-2xl shadow-sm p-5 flex flex-col justify-between">
                <div class="text-xs font-bold uppercase tracking-wider text-slate-500 text-center">Net Proceeds (Líquido D0)</div>
                <div id="kpiNetProceeds" class="text-2xl font-bold mt-2 text-center text-blue-700">R$ 0,00</div>
                <div class="text-xs font-medium text-slate-500 text-center mt-2">Caixa Livre para o Tomador</div>
            </div>

            <!-- One-Off Table Costs (Fixed Only - No recurring, no fees) -->
            <div class="bg-white border border-blue-100 rounded-2xl shadow-sm p-5 flex flex-col justify-between">
                <div class="text-xs font-bold uppercase tracking-wider text-slate-500 text-center">Custos de Tabela (One-Off)</div>
                <div id="kpiOneOffTable" class="text-2xl font-bold mt-2 text-center text-slate-800">R$ 0,00</div>
                <div class="text-xs font-medium text-slate-500 text-center mt-2">Pagos na cabeça (D0) s/ Fees</div>
            </div>

            <!-- Receita Sales Desk -->
            <div class="bg-emerald-50 border border-emerald-200 rounded-2xl shadow-sm p-5 flex flex-col justify-between">
                <div class="text-xs font-bold uppercase tracking-wider text-emerald-800 text-center flex items-center justify-center gap-2">
                    Receita Sales Desk
                    <i class="fa-solid fa-briefcase text-emerald-600 text-xs"></i>
                </div>
                
                <!-- Output Dinâmico da Receita -->
                <div id="valSalesRevenue" class="text-2xl font-bold mt-2 text-center text-emerald-700">R$ 0,00</div>
                
                <!-- Régua de Spread -->
                <div class="mt-4">
                    <div class="flex justify-between text-[10px] font-bold text-emerald-800 mb-1">
                        <span>Mercado</span>
                        <span id="valSalesSpreadDisplay">Spread: -</span>
                        <span>Indicativa</span>
                    </div>
                    <input type="range" id="rangeSalesSpread" min="0" max="100" step="0.05" value="0" class="w-full h-2 rounded-lg cursor-pointer disabled:opacity-50" disabled>
                </div>
            </div>

            <!-- Receita Bloxs IB -->
            <div class="bg-white border border-blue-100 rounded-2xl shadow-sm p-5 flex flex-col justify-between">
                <div class="text-xs font-bold uppercase tracking-wider text-slate-500 text-center flex items-center justify-center gap-2">
                    Receita Bloxs IB
                    <i class="fa-solid fa-crown text-blue-700 text-xs"></i>
                </div>
                <div id="kpiBloxsRevenue" class="text-2xl font-bold mt-2 text-center text-blue-700">R$ 0,00</div>
                <div class="text-xs font-medium text-slate-500 text-center mt-2">Success Fee + Originação</div>
                
                <div class="mt-3 space-y-2 border-t border-slate-100 pt-2">
                    <label class="flex items-center gap-2 cursor-pointer justify-center hover:bg-slate-50 p-1 rounded transition-colors">
                        <input type="checkbox" id="checkBloxsEmission" class="w-3.5 h-3.5 accent-blue-700 rounded cursor-pointer">
                        <span class="text-[10px] text-slate-600 font-semibold uppercase tracking-wide">Emitido pela Bloxs? (+30k)</span>
                    </label>
                    <label class="flex items-center gap-2 cursor-pointer justify-center hover:bg-slate-50 p-1 rounded transition-colors">
                        <input type="checkbox" id="checkBloxsManagement" class="w-3.5 h-3.5 accent-blue-700 rounded cursor-pointer">
                        <span class="text-[10px] text-slate-600 font-semibold uppercase tracking-wide">Gestão Bloxs? (+3k/ano)</span>
                    </label>
                </div>
            </div>
        </div>

        <!-- Chart Section -->
        <div class="bg-white rounded-2xl shadow-sm border border-blue-100 overflow-hidden">
            <div class="px-6 py-4 border-b border-blue-100 flex items-center justify-between bg-slate-50/50">
                <div class="flex items-center gap-2">
                    <i class="fa-solid fa-arrow-trend-up text-blue-700"></i>
                    <h3 class="text-sm font-bold text-slate-800">Potencial de Receita por compressão de Spread</h3>
                </div>
                <div class="text-right">
                    <div class="text-[10px] text-slate-500 uppercase font-bold">Potencial de receita excedente (Máx)</div>
                    <div id="valMaxRevenue" class="text-lg font-bold text-blue-700 leading-none">R$ 0,00</div>
                </div>
            </div>
            <div class="p-6 h-[400px]">
                <canvas id="sensitivityChart"></canvas>
            </div>
        </div>

        <!-- Cost Breakdown Section -->
        <div class="bg-white rounded-2xl shadow-sm border border-blue-100 overflow-hidden">
            <div class="px-6 py-4 border-b border-blue-100 flex items-center gap-2 bg-slate-50/50">
                <i class="fa-solid fa-list-check text-blue-700"></i>
                <h3 class="text-sm font-bold text-slate-800">Detalhamento dos Custos de Tabela (Estimados)</h3>
            </div>
            <div class="p-6">
                <div class="overflow-x-auto">
                    <table class="w-full text-sm text-left">
                        <thead class="text-xs text-slate-500 uppercase bg-slate-50 border-b border-slate-100">
                            <tr>
                                <th class="px-4 py-3 font-semibold">Item de Custo</th>
                                <th class="px-4 py-3 font-semibold">Tipo</th>
                                <th class="px-4 py-3 font-semibold text-right">Valor Unit.</th>
                                <th class="px-4 py-3 font-semibold text-right">Total no Prazo</th>
                            </tr>
                        </thead>
                        <tbody id="costTableBody" class="divide-y divide-slate-100 text-slate-700">
                            <!-- Populated by JS -->
                        </tbody>
                        <tfoot class="bg-slate-50 font-bold text-slate-900">
                            <tr>
                                <td colspan="3" class="px-4 py-3 text-right">Custos Totais:</td>
                                <td id="tableTotalFooter" class="px-4 py-3 text-right">R$ 0,00</td>
                            </tr>
                        </tfoot>
                    </table>
                </div>
                <p class="text-[10px] text-slate-400 mt-2">* Custos estimados baseados em tabela padrão. Podem variar conforme negociação e fornecedores.</p>
            </div>
        </div>

        <!-- Notes Section -->
        <div class="bg-slate-50 rounded-2xl p-6 border border-slate-200">
            <div class="flex items-start gap-3">
                <i class="fa-solid fa-file-lines text-blue-700 mt-1 flex-shrink-0"></i>
                <div>
                    <h3 class="text-lg font-bold text-slate-800 mb-2">Premissas e Notas Técnicas</h3>
                    <div class="space-y-4 text-sm text-slate-700">
                        <div class="p-3 bg-white border border-slate-100 rounded-lg shadow-sm">
                            <p class="font-semibold text-blue-900 mb-1">1) Sistema de Amortização</p>
                            <p>O simulador assume <b>Sistema Price</b> (Parcelas Constantes) na PMT do CRI.</p>
                        </div>
                        <div class="p-3 bg-white border border-slate-100 rounded-lg shadow-sm">
                            <p class="font-semibold text-blue-900 mb-1">2) Simplificação de Calendário</p>
                            <p>Diferente de uma calculadora oficial da ANBIMA que conta "Dias Úteis (DU/252)", este código projeta um cenário teórico de <b>"Mês Comercial" (30/360)</b>. Ele ignora feriados e dias úteis específicos. Para uma simulação comercial de upside, isso é aceitável, mas para liquidação financeira real, haveria pequenas diferenças.</p>
                        </div>
                        <div class="p-3 bg-white border border-slate-100 rounded-lg shadow-sm">
                            <p class="font-semibold text-blue-900 mb-1">3) Pontos de Atenção</p>
                            <ul class="list-disc pl-4 space-y-1 text-slate-600">
                                <li>A base de cálculo é mensal exponencial (não considera calendário de dias úteis específicos/feriados).</li>
                                <li>Os custos recorrentes são informativos e baseado em estruturações passadas que poderão sofrer alterações; a precificação de venda (PU) está sendo feita sobre o fluxo integral da parcela do empréstimo.</li>
                                <li>O <b>'Ganho Máximo'</b> exibido é puramente financeiro (Marcação a Mercado), derivado da diferença entre a taxa que o cliente paga e a taxa que o investidor aceita receber.</li>
                            </ul>
                        </div>
                        <div class="p-3 bg-white border border-slate-100 rounded-lg shadow-sm">
                            <p class="font-semibold text-blue-900 mb-1">4) Estimativa de Custos</p>
                            <p>Os custos de tabela apresentados são uma estimativa baseada em operações passadas e podem sofrer variações conforme os prestadores de serviços contratados ou a necessidade de gross-up nos pagamentos.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    </div>

    <script>
        // --- Helpers ---
        const clamp = (v, min, max) => Math.min(Math.max(v, min), max);
        
        const formatCurrency = (val) => new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(val);
        const formatPct = (val) => new Intl.NumberFormat('pt-BR', { style: 'percent', minimumFractionDigits: 2 }).format(val);
        const annualToMonthly = (annual) => Math.pow(1 + annual, 1 / 12) - 1;

        const calculatePMT = (rate, nper, pv) => {
            if (rate === 0) return -pv / nper;
            return (pv * rate * Math.pow(1 + rate, nper)) / (Math.pow(1 + rate, nper) - 1);
        };

        const calculatePV = (rate, nper, pmt) => {
            if (rate === 0) return -pmt * nper;
            return (pmt * (1 - Math.pow(1 + rate, -nper))) / rate;
        };

        // --- Data with Labels ---
        const defaultCostItems = [
            { label: "CVM — Taxa de Fiscalização", value: 11400, type: "fixed" },
            { label: "ANBIMA — Registro", value: 10441, type: "fixed" },
            { label: "ANBIMA — Base de Dados", value: 1587.26, type: "fixed" },
            { label: "B3 — Registro CRI/CRA", value: 11020, type: "fixed" },
            { label: "B3 — Registro CCB/CCI", value: 380, type: "fixed" },
            { label: "Bloxs — Emissão", value: 30000, type: "fixed" },
            { label: "Bloxs — Gestão (Setup)", value: 3000, type: "fixed" },
            { label: "Assessor Legal", value: 119517.15, type: "fixed" },
            { label: "Medições de Obra", value: 7171.03, type: "fixed" },
            { label: "Implantação Agente Fiduciário", value: 5975.86, type: "fixed" },
            { label: "Agente Fiduciário (Setup)", value: 22708.26, type: "fixed" },
            { label: "Instituição Custodiante (Setup)", value: 5975.86, type: "fixed" },
            { label: "Registro CCI (Custodiante)", value: 5975.86, type: "fixed" },
            { label: "Escriturador Nota Comercial", value: 5975.86, type: "fixed" },
            // REMOVIDO: { label: "Bloxs — Estruturação", value: 908330.35, type: "fixed" } -> Agora é dinâmico
            
            // Monthly
            { label: "Bloxs — Gestão (Mensal)", value: 3000, type: "monthly" },
            { label: "Itaú — Escriturador", value: 442.72, type: "monthly" },
            { label: "Itaú — Tarifa de Conta", value: 80.80, type: "monthly" },
            { label: "B3 — Taxa Transação", value: 80, type: "monthly" },
            { label: "B3 — Utilização", value: 70, type: "monthly" },
            { label: "B3 — Custódia", value: 418, type: "monthly" },

            // Yearly
            { label: "Agente Fiduciário (Anual)", value: 21029.33, type: "yearly" },
            { label: "Custodiante (Anual)", value: 5534.03, type: "yearly" },
            { label: "Auditoria (Anual)", value: 5364.43, type: "yearly" },

            // Semi
            { label: "Contador (Semestral)", value: 1560, type: "semi" }
        ];

        // --- State ---
        let state = {
            volume: 0, 
            prazo: 0, 
            indexType: 'CDI',
            indexValue: 0.15, // 15% default
            feeBloxsPct: 0.025,
            feeOrigPct: 0.005, // Origination Fee Default 0.5%
            spreadOrig: 0.05,
            spreadMkt: 0.03,
            stepBps: 25,
            grossUp: false,
            bloxsEmission: false,
            bloxsManagement: false,
            salesSpread: 0.04
        };

        // --- Chart Instance ---
        let chartInstance = null;

        // --- DOM Elements ---
        const els = {
            vol: document.getElementById('inputVolume'),
            prazo: document.getElementById('inputPrazo'),
            indexType: document.getElementById('selectIndexType'),
            indexValue: document.getElementById('inputIndexValue'),
            labelIndex: document.getElementById('labelIndexType'),
            feeRange: document.getElementById('rangeFee'),
            feeDisplay: document.getElementById('displayFee'),
            origFeeRange: document.getElementById('rangeOrigFee'),
            origFeeDisplay: document.getElementById('displayOrigFee'),
            grossUp: document.getElementById('checkGrossUp'),
            spreadOrig: document.getElementById('inputSpreadOrig'),
            spreadMkt: document.getElementById('inputSpreadMkt'),
            step: document.getElementById('inputStep'),
            chkBloxsEmission: document.getElementById('checkBloxsEmission'),
            chkBloxsManagement: document.getElementById('checkBloxsManagement'),
            rangeSales: document.getElementById('rangeSalesSpread'),
            valSalesSpread: document.getElementById('valSalesSpreadDisplay'),
            valSalesRevenue: document.getElementById('valSalesRevenue'),
            oneOffHighVal: document.getElementById('valOneOffTotalHighlight'),
            oneOffHighPct: document.getElementById('valOneOffPctHighlight'),
            kpiNet: document.getElementById('kpiNetProceeds'),
            kpiOneOffTable: document.getElementById('kpiOneOffTable'),
            kpiBloxsRev: document.getElementById('kpiBloxsRevenue'),
            maxRev: document.getElementById('valMaxRevenue'),
            costTableBody: document.getElementById('costTableBody'),
            tableTotalFooter: document.getElementById('tableTotalFooter')
        };

        // --- Main Logic ---
        function updateSimulation() {
            const GROSS_UP_ISS = 0.1633;
            
            // Allow calculation even if 0 to show table costs structure, but guard charts
            const vol = state.volume > 0 ? state.volume : 0;
            const n = state.prazo > 0 ? state.prazo : 0;
            const occurrencesSemi = Math.ceil(n / 6);
            
            // Indexador
            const baseAA = state.indexValue;
            const baseMes = annualToMonthly(baseAA);

            // Spread Originador (Taxa Indicativa)
            const spreadOrigMes = annualToMonthly(state.spreadOrig);
            const taxaClienteMes = (1 + baseMes) * (1 + spreadOrigMes) - 1;

            // Flow
            const pmtCliente = calculatePMT(taxaClienteMes, n, vol);
            
            // 1. Calculate Dynamic Fees First
            // Fee Bloxs Calculation (Success Fee)
            let feeBloxs = vol * clamp(state.feeBloxsPct, 0, 0.2);
            if (state.grossUp) {
                feeBloxs = feeBloxs / (1 - GROSS_UP_ISS);
            }

            // Fee Originação (Variable)
            let feeOrig = vol * clamp(state.feeOrigPct, 0, 0.2);

            // 2. Costs & Table Population
            let upfrontFixed = 0;
            let recurringTotal = 0;
            let tableHTML = "";

            // Loop Standard Items
            defaultCostItems.forEach(item => {
                let itemTotal = 0;
                let typeLabel = "";

                if (item.type === 'fixed') {
                    itemTotal = item.value;
                    typeLabel = "Fixo (D0)";
                    upfrontFixed += itemTotal;
                } else if (item.type === 'monthly') {
                    itemTotal = item.value * n;
                    typeLabel = "Mensal";
                    recurringTotal += itemTotal;
                } else if (item.type === 'yearly') {
                    itemTotal = item.value * (n / 12);
                    typeLabel = "Anual";
                    recurringTotal += itemTotal;
                } else if (item.type === 'semi') {
                    itemTotal = item.value * occurrencesSemi;
                    typeLabel = "Semestral";
                    recurringTotal += itemTotal;
                }

                // Append row
                tableHTML += `
                    <tr class="hover:bg-slate-50 transition-colors">
                        <td class="px-4 py-2 font-medium">${item.label}</td>
                        <td class="px-4 py-2 text-slate-500 text-xs uppercase">${typeLabel}</td>
                        <td class="px-4 py-2 text-right text-slate-600">${formatCurrency(item.value)}</td>
                        <td class="px-4 py-2 text-right font-semibold text-slate-700">${formatCurrency(itemTotal)}</td>
                    </tr>
                `;
            });

            // Add Dynamic Fee Bloxs Row (Estruturação)
            tableHTML += `
                <tr class="hover:bg-blue-50 transition-colors bg-blue-50/30">
                    <td class="px-4 py-2 font-medium text-blue-700">Bloxs — Estruturação (${formatPct(state.feeBloxsPct)})</td>
                    <td class="px-4 py-2 text-blue-500 text-xs uppercase">Fee (D0)</td>
                    <td class="px-4 py-2 text-right text-blue-600">-</td>
                    <td class="px-4 py-2 text-right font-semibold text-blue-700">${formatCurrency(feeBloxs)}</td>
                </tr>
            `;

            // Add Dynamic Origination Fee Row
            tableHTML += `
                <tr class="hover:bg-violet-50 transition-colors bg-violet-50/30">
                    <td class="px-4 py-2 font-medium text-violet-700">Fee de Originação (${formatPct(state.feeOrigPct)})</td>
                    <td class="px-4 py-2 text-violet-500 text-xs uppercase">Fee (D0)</td>
                    <td class="px-4 py-2 text-right text-violet-600">-</td>
                    <td class="px-4 py-2 text-right font-semibold text-violet-700">${formatCurrency(feeOrig)}</td>
                </tr>
            `;

            els.costTableBody.innerHTML = tableHTML;

            // Total Bloxs Revenue (Nominal)
            const bloxsTotalRevenue = feeBloxs 
                                    + feeOrig
                                    + (state.bloxsEmission ? 30000 : 0) 
                                    + (state.bloxsManagement ? (3000 * (n/12)) : 0);

            // Borrower Totals
            // Table Costs Total now includes everything listed in table (Fixed + Recurring + Bloxs Fee + Orig Fee)
            const tableCostsTotal = upfrontFixed + recurringTotal + feeBloxs + feeOrig; 
            els.tableTotalFooter.textContent = formatCurrency(tableCostsTotal);

            const oneOffTotal = tableCostsTotal; // Since fees are now part of table calculation logic above
            
            const netProceedsD0 = vol - oneOffTotal;
            const oneOffPct = vol > 0 ? oneOffTotal / vol : 0;
            
            // --- Update UI KPIs ---
            const zeroFmt = formatCurrency(0);
            
            if (vol <= 0 || n <= 0) {
                els.oneOffHighVal.textContent = zeroFmt;
                els.oneOffHighPct.textContent = "0,00% do volume";
                els.kpiNet.textContent = zeroFmt;
                els.kpiOneOffTable.textContent = zeroFmt;
                els.kpiBloxsRev.textContent = zeroFmt;
                els.maxRev.textContent = zeroFmt;
                els.valSalesRevenue.textContent = zeroFmt;
                els.rangeSales.disabled = true;
                if(chartInstance) {
                    chartInstance.data.labels = [];
                    chartInstance.data.datasets[0].data = [];
                    chartInstance.update();
                }
                return;
            }

            els.rangeSales.disabled = false;
            els.oneOffHighVal.textContent = formatCurrency(oneOffTotal);
            els.oneOffHighPct.textContent = formatPct(oneOffPct) + " do volume";
            els.kpiNet.textContent = formatCurrency(netProceedsD0);
            
            // KPI UPDATED: Shows ONLY Fixed (D0) costs, excluding recurring & Fees
            // As per request: Taxa Fiscalizacao, ANBIMA, Registro, Legal, Medicoes, Implantação, Setup AF/Cust/CCI/NC
            // This is conveniently stored in 'upfrontFixed' variable from our loop
            els.kpiOneOffTable.textContent = formatCurrency(upfrontFixed);
            
            els.kpiBloxsRev.textContent = formatCurrency(bloxsTotalRevenue);

            // --- Sensitivity Grid ---
            const sMax = state.spreadOrig; 
            const sMin = Math.min(state.spreadMkt, sMax);
            const step = clamp(state.stepBps, 1, 500) / 10000;

            const labels = [];
            const values = [];

            for (let s = sMax; s >= sMin - 1e-12; s -= step) {
                const spreadMktMes = annualToMonthly(clamp(s, 0, 10));
                const taxaDescMes = (1 + baseMes) * (1 + spreadMktMes) - 1;
                const pvMercado = calculatePV(taxaDescMes, n, pmtCliente);
                const deltaFinanceiro = pvMercado - vol;
                
                const spreadPct = (s * 100).toFixed(2);
                labels.push(`+${spreadPct}%`);
                values.push(deltaFinanceiro);
            }
            
            const ganhoMaximo = values[values.length - 1] || 0;
            els.maxRev.textContent = formatCurrency(ganhoMaximo);

            // --- Sales Desk Slider Logic ---
            const salesMin = state.spreadMkt * 100;
            const salesMax = state.spreadOrig * 100;
            
            els.rangeSales.min = salesMin;
            els.rangeSales.max = salesMax;
            
            if (state.salesSpread * 100 < salesMin || state.salesSpread * 100 > salesMax) {
               state.salesSpread = state.spreadOrig;
               els.rangeSales.value = salesMax;
            }

            const salesSpreadMes = annualToMonthly(state.salesSpread);
            const salesTaxaDescMes = (1 + baseMes) * (1 + salesSpreadMes) - 1;
            const salesPVMercado = calculatePV(salesTaxaDescMes, n, pmtCliente);
            const salesRevenue = salesPVMercado - vol;
            
            const spreadProfit = state.spreadOrig - state.salesSpread;
            els.valSalesSpread.textContent = `Spread: +${(spreadProfit * 100).toFixed(2)}%`;
            els.valSalesRevenue.textContent = formatCurrency(salesRevenue);

            updateChart(labels, values);
        }

        function updateChart(labels, data) {
            const ctx = document.getElementById('sensitivityChart').getContext('2d');
            
            if (chartInstance) {
                chartInstance.data.labels = labels;
                chartInstance.data.datasets[0].data = data;
                chartInstance.data.datasets[0].backgroundColor = data.map(v => v >= 0 ? '#1d4ed8' : '#bfdbfe');
                chartInstance.update();
            } else {
                chartInstance = new Chart(ctx, {
                    type: 'bar',
                    data: {
                        labels: labels,
                        datasets: [{
                            label: 'Ganho R$',
                            data: data,
                            backgroundColor: data.map(v => v >= 0 ? '#1d4ed8' : '#bfdbfe'),
                            borderRadius: 4,
                            borderSkipped: false
                        }]
                    },
                    options: {
                        responsive: true,
                        maintainAspectRatio: false,
                        plugins: {
                            tooltip: {
                                callbacks: {
                                    label: function(context) {
                                        return 'Ganho R$: ' + new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(context.raw);
                                    }
                                },
                                backgroundColor: 'white',
                                titleColor: '#0f172a',
                                bodyColor: '#0f172a',
                                borderColor: '#e2e8f0',
                                borderWidth: 1,
                                padding: 12,
                                displayColors: false,
                            },
                            legend: { display: false }
                        },
                        scales: {
                            y: {
                                ticks: {
                                    callback: function(value) {
                                        return 'R$' + (value / 1000000).toFixed(1) + 'M';
                                    },
                                    color: '#64748b',
                                    font: { size: 11 }
                                },
                                grid: { color: '#e2e8f0' }
                            },
                            x: {
                                ticks: { color: '#64748b', font: { size: 11 } },
                                grid: { display: false }
                            }
                        }
                    }
                });
            }
        }

        // --- Event Listeners ---
        
        els.vol.addEventListener('input', (e) => {
            let val = e.target.value.replace(/\D/g, '');
            if(!val) {
                state.volume = 0;
                e.target.value = "";
                updateSimulation();
                return;
            }
            const numVal = parseInt(val) / 100;
            state.volume = numVal;
            e.target.value = numVal.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
            updateSimulation();
        });

        const bindInput = (el, key, isPct = false, scale = 1) => {
            el.addEventListener('input', (e) => {
                let val = parseFloat(e.target.value);
                if (isNaN(val)) val = 0;
                state[key] = isPct ? val / 100 : val * scale;
                updateSimulation();
            });
        };

        bindInput(els.prazo, 'prazo');
        bindInput(els.indexValue, 'indexValue', true); 
        bindInput(els.spreadOrig, 'spreadOrig', true);
        bindInput(els.spreadMkt, 'spreadMkt', true);
        bindInput(els.step, 'stepBps');

        els.rangeSales.addEventListener('input', (e) => {
            const val = parseFloat(e.target.value);
            state.salesSpread = val / 100;
            updateSimulation();
        });

        els.feeRange.addEventListener('input', (e) => {
            const val = parseFloat(e.target.value);
            state.feeBloxsPct = val / 100;
            els.feeDisplay.textContent = formatPct(state.feeBloxsPct);
            updateSimulation();
        });

        els.origFeeRange.addEventListener('input', (e) => {
            const val = parseFloat(e.target.value);
            state.feeOrigPct = val / 100;
            els.origFeeDisplay.textContent = formatPct(state.feeOrigPct);
            updateSimulation();
        });

        els.indexType.addEventListener('change', (e) => {
            state.indexType = e.target.value;
            if (state.indexType === 'CDI') {
                state.indexValue = 0.15; 
                els.indexValue.value = 15.00;
                els.labelIndex.textContent = 'CDI (a.a. %)';
            } else {
                state.indexValue = 0.05;
                els.indexValue.value = 5.00;
                els.labelIndex.textContent = 'IPCA (a.a. %)';
            }
            updateSimulation();
        });

        els.grossUp.addEventListener('change', (e) => {
            state.grossUp = e.target.checked;
            updateSimulation();
        });

        els.chkBloxsEmission.addEventListener('change', (e) => {
            state.bloxsEmission = e.target.checked;
            updateSimulation();
        });

        els.chkBloxsManagement.addEventListener('change', (e) => {
            state.bloxsManagement = e.target.checked;
            updateSimulation();
        });

        // Init
        updateSimulation();

    </script>
</body>
</html>
