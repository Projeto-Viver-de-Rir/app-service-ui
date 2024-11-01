<script setup lang="ts">
import { computed, onMounted, onUnmounted, reactive, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import BaseBreadcrumb from "@/components/shared/BaseBreadcrumb.vue";
import type { event } from "@/entities/event";
import { EVENT_PLACES_MORE, useEvents } from "@/stores/eventStore";
import { storeToRefs } from "pinia";
import { useSnackBar } from "@/stores/snackBarStore";
import { eventFormRules } from "@/utils/form";

const router = useRouter();
const route = useRoute();
const eventStore = useEvents();
const snackBarStore = useSnackBar();
const tab1Ref = ref();
const tab2Ref = ref();

const {
  getEvent: event,
	getPlaces: eventNamesList,
} = storeToRefs(eventStore);

interface EventFormProps {
  tab: string;
	loading: boolean;
	eventModel: Record<string, any>;
	formValid: boolean;
	toggleNameInputType: boolean;
}

const formatDate = (date: Date) => {
	const day = date.getDate();
	const month = date.getMonth() + 1;
	const year = date.getFullYear();
	const dd = day < 10 ? `0${day}` : day.toString();
	const mm = month < 10 ? `0${month}` : month.toString();

	return `${year}-${mm}-${dd}`;
};

const data: EventFormProps = reactive({
  tab: 'tab-1',
	loading: false,
	formValid: false,
	toggleNameInputType: false,
	eventModel: {
		when: {
			date: formatDate(new Date()),
			time: '00:00',
		}
	},
})

const isEdit = computed(() => {
  return !!event.value?.id;
})

const breadcrumbs = ref([
	{
    text: "Eventos",
    disabled: false,
    to: "/events",
	},
	{
	text: `${isEdit.value ? 'Edição' : 'Adição'}`,
    disabled: true,
	},
]);

const page = ref({ title: "Eventos" });
const formLabelClass = ref('text-subtitle-1 font-weight-semibold text-lightText mb-1');
const formRef = ref();
const rules = ref(eventFormRules());

const setModelDate = (date: Date) => {
	const eventDate = new Date(date);
	data.eventModel.when.date = formatDate(new Date(date));
	console.log(formatDate(new Date(date)))
	const hh = eventDate.getHours();
	const mm = eventDate.getMinutes();
	const hours = hh < 10 ? `0${hh}` : hh.toString();
	const minutes = mm < 10 ? `0${mm}` : mm.toString();
	data.eventModel.when.time = `${hours}:${minutes}`;
};

const formattedDate = computed((): Date => {
	const time = data.eventModel.when.time.split(':');
	let date = new Date(data.eventModel.when.date)
	date.setHours(time[0], time[1], 0);
  	return date;
});

const setEventModel = (event: event) => {
	data.eventModel.name = event.name;
	data.eventModel.description = event.description;
	data.eventModel.meetingPoint = event.meetingPoint;
	data.eventModel.occupancy = event.occupancy;
	data.eventModel.address = event.address;
	data.eventModel.city = event.city;
	setModelDate(event.happenAt as Date);
};

const goBack = () => {
	router.back();
};

const onModelChange = (value: any) => {
	if (value === EVENT_PLACES_MORE) {
		data.toggleNameInputType = !data.toggleNameInputType
		data.eventModel.name = 'Novo evento'
	}
};

const fetchEvent = async (): Promise<void> => {
	data.loading = true;
	try {
		await eventStore.fetchEventById(route.params.id as string);
	} catch (error) {
		snackBarStore.addToQueue({ 
			color: 'error', 
			message: 'Não foi possível carregar o evento.'
		});
		goBack();
	}
	data.loading = false;
}

const prepareModelToSubmit = () => {
	return {
		...(isEdit.value ? { id: event.value?.id } : {}),
		name: data.eventModel.name,
		description: data.eventModel.description,
		meetingPoint: data.eventModel.meetingPoint,
		occupancy: data.eventModel.occupancy,
		address: data.eventModel.address,
		city: data.eventModel.city,
		happenAt: formattedDate.value,
		status: 1,
	}
};

const dateIsValid = computed(() => {
  return !!data.eventModel.when.date;
});

const timeIsValid = computed(() => {
  return !!data.eventModel.when.time;
});

const disableSubmit = computed(() => {
  return !data.formValid ||
		!dateIsValid.value ||
		!timeIsValid.value;
})

const findInputIdByTab = async (elementId: string) => {
  const tabs = [
  {
    id: 'tab-1',
    element: tab1Ref,
  },
  {
    id: 'tab-2',
    element: tab2Ref,
  }];
  tabs.forEach((tab) => {
    const el = tab.element.value.$el;
    const inputArr = el.getElementsByTagName('input');
    var inputList = [].slice.call(inputArr);
    if (!!inputList.find((element: any) => element.id === elementId)) {
      data.tab = tab.id;
    }
  })
};

const validateThenSubmit = async () => {
	if (!data.eventModel.address || !data.eventModel.city) {
		data.tab = 'tab-2'
	} else if (!data.eventModel.occupancy) {
		data.tab = 'tab-1'
	} else {
		const { valid, errors } = await formRef.value.validate()
		if (valid) {
			submit();
		} else {
			findInputIdByTab(errors[0].id);
		}
	}
};

const submit = async (): Promise<void> => {
	data.loading = true;
	try {
		const event = prepareModelToSubmit();
		await eventStore.createOrUpdate(event);
		snackBarStore.addToQueue({ 
			color: 'success', 
			message: `Evento ${isEdit.value ? 'atualizado' : 'criado' } com sucesso.`
		});
		router.push({ name: 'Dashboard' });
	} catch (error) {
		snackBarStore.addToQueue({ 
			color: 'error', 
			message: `Não foi possível ${isEdit.value ? 'atualizar' : 'criar' } o evento.`
		});
		goBack();
	}
	data.loading = false;
}

onMounted(async () => {
  if (!!route.params.id) {
	  try {
			await fetchEvent();
			setEventModel(event.value as event);
		} catch (error) {
			snackBarStore.addToQueue({ 
				color: 'error', 
				message: 'Não foi possível recurerar os dados do evento.'
			});
			goBack();
		}
	}
});

onUnmounted(async () => {
  eventStore.resetEvent();
});
</script>

<template>
  <div class="event-form">
    <div v-if="data.loading" class="loading" />
    <BaseBreadcrumb
			:title="page.title"
			:breadcrumbs="breadcrumbs"
    />


		<div class="tabs-container">
			<v-tabs
				v-model="data.tab"
				color="primary"
			>
				<v-tab text="Essenciais" value="tab-1" />
				<v-tab text="Localidade" value="tab-2" />
			</v-tabs>
		</div>

		<v-row class="mt-4">
			<v-col cols="12" md="12">
				<v-row>
					<v-col cols="12" md="8">
						<!-- Tab context cards -->
						<v-window v-model="data.tab" class="rounded-md border">
							<v-form v-model="data.formValid" 
									class="form-container" 
									ref="formRef" 
									@submit.prevent="validateThenSubmit">

								<v-window-item value="tab-1" ref="tab1Ref">
									<v-card title="Essenciais" elevation="0">
										<v-card-text class="px-8 pb-6">
											<div class="form-property-data mb-4">
												<v-label :class="[formLabelClass, 'required']">Nome do evento</v-label>
												<v-autocomplete
													v-if="!data.toggleNameInputType"
													v-model="data.eventModel.name"
													:items="eventNamesList"
													:rules="rules.name"
													class="rounded"
													placeholder="Procure um nome na lista"
													density="comfortable"
													@update:modelValue="onModelChange"
													required
												>
												
												</v-autocomplete>
												<v-text-field
													v-else
													v-model="data.eventModel.name"
													placeholder="Onde será o local de encontro?"
													:rules="rules.name"
													required
												>
													<template v-slot:append>
														<v-tooltip activator="parent"	location="top">
															Procurar um local sugerido na lista
														</v-tooltip>
														<v-slide-x-reverse-transition mode="out-in">
															<v-icon
																icon="mdi-arrow-u-left-bottom"
																@click="data.toggleNameInputType = !data.toggleNameInputType"
															></v-icon>
														</v-slide-x-reverse-transition>
													</template>
												</v-text-field>
											</div>
											<div class="form-property-data mb-4">
												<v-label :class="[formLabelClass, 'required']">Ponto de encontro</v-label>
												<v-text-field
													v-model="data.eventModel.meetingPoint"
													placeholder="Onde será o local de encontro?"
													:rules="rules.meetingPoint"
													required
												></v-text-field>
											</div>
											<div class="form-property-data mb-4">
												<v-label :class="[formLabelClass]">Informação</v-label>
												<v-text-field
													v-model="data.eventModel.description"
													placeholder="Insira uma informação adicional sobre o evento"
												></v-text-field>
											</div>
										</v-card-text>
									</v-card>
								</v-window-item>

								<v-window-item value="tab-2" ref="tab2Ref">
									<v-row>
										<v-col cols="12" md="12">
											<v-card title="Localidade" elevation="0">
												<v-card-text class="px-8">
													<div class="form-property-data mb-4">
														<v-label :class="[formLabelClass, 'required']">Endereço</v-label>
														<v-text-field
															v-model="data.eventModel.address"
															placeholder="Av. Dezessete de Abril, 36 - Guajuviras"
															:rules="rules.address"
															required
														></v-text-field>
													</div>
													<div class="form-property-data">
														<v-label :class="[formLabelClass, 'required']">Cidade</v-label>
														<v-text-field
															v-model="data.eventModel.city"
															placeholder="Canoas, RS"
															:rules="rules.city"
															required
														></v-text-field>
													</div>
												</v-card-text>
											</v-card>
										</v-col>
									</v-row>
								</v-window-item>
							</v-form>

						</v-window>
					</v-col>

					<!-- Fixed cards -->
					<v-col cols="12" md="4">
						<v-row>
							<v-col cols="12" md="12">
								<v-card title="Quando" class="border mb-6" elevation="0" style="z-index: 999999">
									<v-card-text class="px-8">
										<v-label :class="[formLabelClass, 'required']">Data</v-label>
										<v-text-field
											v-model="data.eventModel.when.date"
											placeholder="20/10/2024"
											format="DD/MM/AAAA"
											:rules="rules.date"
											type="date"
											required
										></v-text-field>
										<div class="ml-4 validation-message" v-if="!dateIsValid">Data é obrigatória!</div>

										<v-label :class="[formLabelClass, 'required mt-5']">Horário</v-label>
										<v-text-field
											v-model="data.eventModel.when.time"
											placeholder="12:00"
											:rules="rules.time"
											type="time"
											required
										></v-text-field>
										<div class="ml-4 validation-message" v-if="!timeIsValid">Horário é obrigatório!</div>
									</v-card-text>
								</v-card>

								<v-card title="Vagas" class="border mb-6" elevation="0" style="z-index: 0">
									<v-card-text class="px-8">
										<v-label :class="[formLabelClass, 'required']">Vagas disponíveis</v-label>
										<v-text-field
											v-model="data.eventModel.occupancy"
											type="number"
											placeholder="10"
											:rules="rules.occupancy"
											required
										></v-text-field>
									</v-card-text>
								</v-card>

								<v-card class="border pt-4" elevation="0" style="z-index: 0">
									<v-card-actions class="justify-end">
										<v-btn color="error"
														variant="flat"
														size="large"
														width="100"
														@click="goBack">Cancelar</v-btn>
										<v-btn color="primary" 
														variant="flat" 
														size="large" 
														class="ml-5" 
														width="100"
														@click="validateThenSubmit"
														:disabled="disableSubmit">
											{{ isEdit ? 'Atualizar' : 'Criar' }}
										</v-btn>
									</v-card-actions>
								</v-card>
								

							</v-col>
						</v-row>

					</v-col>
				</v-row>
			</v-col>
		</v-row>
  </div>
</template>
<style lang="scss" scoped>
.validation-message {
	color: rgb(var(--v-theme-error));
}
:deep(.v-autocomplete .v-field) {
	border-width: thin !important;
	border-style: solid !important;
	border-color: rgba(var(--v-border-color), var(--v-border-opacity)) !important;
	border-radius: 6px;
}

:deep(.v-field--variant-filled .v-field__overlay) {
	background-color: unset;
}
:deep(.dp__input_invalid) {
	border-color: rgb(var(--v-theme-error));
	box-shadow: none;
}
:deep(.dp__input_valid) {
	box-shadow: none;
}
:deep(.dp__input_valid:hover) {
	border-color: lightgray;
}
:deep(.v-label.required:after) {
	content: ' *';
	color: rgb(var(--v-theme-error));
}
:deep(.v-label + .v-input--error) {
	color: rgb(var(--v-theme-error));
}
</style>