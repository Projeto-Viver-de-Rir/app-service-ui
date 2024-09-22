<script setup lang="ts">
import { computed, onMounted, onUnmounted, reactive, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import BaseBreadcrumb from "@/components/shared/BaseBreadcrumb.vue";
import type { event } from "@/entities/event";
import { useEvents } from "@/stores/eventStore";
import { storeToRefs } from "pinia";
import { useSnackBar } from "@/stores/snackBarStore";
import { eventFormRules } from "@/utils/form";

const router = useRouter();
const route = useRoute();
const eventStore = useEvents();
const snackBarStore = useSnackBar()

const {
  getEvent: event,
} = storeToRefs(eventStore);

interface EventFormProps {
  tab: string;
	loading: boolean;
	eventModel: Record<string, any>;
	formValid: boolean;
}

const data: EventFormProps = reactive({
  tab: 'tab-1',
	loading: false,
	formValid: false,
	eventModel: {
		when: {
			date: new Date(),
			time: {
				hours: 0,
				minutes: 0,
				seconds: 0
			},
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

const width = ref(window.innerWidth)



const page = ref({ title: "Eventos" });
const locale = ref('pt-BR');
const formLabelClass = ref('text-subtitle-1 font-weight-semibold text-lightText mb-1');
const formRef = ref();
const rules = ref(eventFormRules());

const isMobile = computed(() => {
  return width.value < 960;
})

const tabsDirection = computed((): string => {
  return isMobile.value ? 'vertical' : 'horizontal'
});



const setModelDate = (date: Date) => {
	const eventDate = new Date(date);
	data.eventModel.when.date = eventDate;
	data.eventModel.when.time.hours = eventDate.getHours();
	data.eventModel.when.time.minutes = eventDate.getMinutes();
};

const formatDate = (date: Date) => {
	const day = date.getDate();
	const month = (date.getMonth() + 1).toString().padStart(2, "0");
	const year = date.getFullYear();

	return `${day}/${month}/${year}`;
};

const formatTime = (date: Date) => {
	const hours = date.getHours();
	const minutes = (date.getMinutes() < 10 ? "0" : "") + date.getMinutes();

	return `${hours}:${minutes}`;
};

const formattedDate = computed((): Date => {
	const time = data.eventModel.when.time;
	let date = new Date(data.eventModel.when.date)
	date.setHours(time.hours, time.minutes, time.seconds);
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

const submit = async (): Promise<void> => {
	data.loading = true;
	try {
		const event = prepareModelToSubmit();
		await eventStore.createOrUpdate(event);
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
		await fetchEvent();
		try {
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

		<v-form v-model="data.formValid" 
						class="form-container" 
						ref="formRef" 
						@submit.prevent="submit">
			<div class="tabs-container">
				<v-tabs
					v-model="data.tab"
					color="primary"
					:direction="tabsDirection"
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

								<v-window-item value="tab-1">
									<v-card title="Essenciais" elevation="0">
										<v-card-text class="px-8">
											<div class="form-property-data mb-4">
												<v-text-field
													v-model="data.eventModel.name"
													label="Nome"
													placeholder="Nome do evento"
													:rules="rules.name"
													required
												></v-text-field>
											</div>
											<div class="form-property-data mb-4">
												<v-text-field
													v-model="data.eventModel.meetingPoint"
													label="Ponto de encontro"
													placeholder="Onde será o local de encontro?"
													:rules="rules.meetingPoint"
													required
												></v-text-field>
											</div>
											<div class="form-property-data mb-4">
												<v-text-field
													v-model="data.eventModel.description"
													label="Informação"
													placeholder="Insira uma informação adicional sobre o evento"
												></v-text-field>
											</div>
										</v-card-text>
										<v-card-text class="px-8">

										</v-card-text>
									</v-card>
								</v-window-item>

								<v-window-item value="tab-2">
									<v-row>
										<v-col cols="12" md="12">
											<v-card title="Localidade" elevation="0">
												<v-card-text class="px-8">
													<div class="form-property-data mb-4">
														<v-text-field
															v-model="data.eventModel.address"
															label="Endereço"
															placeholder="Av. Dezessete de Abril, 36 - Guajuviras"
															:rules="rules.address"
															required
														></v-text-field>
													</div>
													<div class="form-property-data">
														<v-text-field
															v-model="data.eventModel.city"
															label="Cidade"
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
							</v-window>
						</v-col>

						<!-- Fixed cards -->
						<v-col cols="12" md="4">
							<v-row>
								<v-col cols="12" md="12">
									<v-card title="Quando" class="border mb-6" elevation="0" style="z-index: 1"> 
										<v-card-text class="px-8">
											<v-label :class="formLabelClass">Data</v-label>
											<VueDatePicker
												class="mb-5"
												v-model="data.eventModel.when.date"
												:locale="locale"
												:format="formatDate"
												:enable-time-picker="false"
											/>
											<v-label :class="formLabelClass">Horário</v-label>
											<VueDatePicker
												v-model="data.eventModel.when.time"
												:locale="locale"
												:format="formatTime"
												time-picker
											/>
										</v-card-text>
									</v-card>

									<v-card title="Vagas" class="border mb-6" elevation="0" style="z-index: 0">
										<v-card-text class="px-8">
											<v-text-field
												v-model="data.eventModel.occupancy"
												type="number"
												label="Vagas disponíveis"
												placeholder="10"
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
														 type="submit"
														 :disabled="!data.formValid">
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
		</v-form>
  </div>
</template>
