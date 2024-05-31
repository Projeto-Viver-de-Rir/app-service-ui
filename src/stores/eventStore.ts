import { defineStore } from 'pinia'
import { container } from 'tsyringe'
import { computed, reactive } from 'vue'
import { finishEventRequest, type event, type eventVolunteers} from '../entities/event'
import { createEventRequest} from '../entities/operation'
import { eventFilter } from '../entities/eventFilter'
import { eventRepository } from '../repositories/eventRepository'
import { eventPresenceRepository } from '../repositories/eventPresenceRepository'
import { operationRepository } from '../repositories/operationRepository'
import { useAuthStore } from '@/stores/auth';
import { fa } from 'vuetify/lib/locale/index.mjs'

interface eventState {
  event: event | null,
  initialEvent: event | null,
  events: event[],
  places: string[],
  filters: eventFilter,
  isEditing: boolean,
  isLoading: boolean,
  numberConfirmed : number,
  isOtherSelecteced: boolean,
  volunteersPresent: [],
  volunteersDeleted: [],
  volunteersConfirmed: finishEventRequest,
  action: string,
  showModel : boolean,
  showModelRemove: boolean,
  isTimeEnded: boolean,
  shouldShowButton: boolean,
  confirmLabel : string,
  nextMonth : string
}

export const useEvents = defineStore('events', () => {
  const state = reactive<eventState>({
    isLoading: true,
    showModel: false,
    showModelRemove: false,
    filters: new eventFilter(""),
    events: [],
    places: [
      "Hospital Fêmina",
      "Hospital Criança Conceição",
      "Hospital Conceição (Adulto)",
      "Hospital São Pedro",
      "SPAAN",
      "Asilo Padre Cacique",
      "FASE Padre Cacique",
      "FASE Cruzeiro",
      "Vila Safira",
      "Outros"
    ],
    event: null,
    initialEvent: null,
    isEditing: false,
    numberConfirmed: 0,
    isOtherSelecteced: false,
    volunteersPresent: [],
    volunteersDeleted: [],
    action: "D",
    isTimeEnded: false,
    confirmLabel: '',
    nextMonth: '',
    shouldShowButton: true,
    volunteersConfirmed: new finishEventRequest([])
  })
  const repository = container.resolve(eventRepository)
  const presenceRepository = container.resolve(eventPresenceRepository)
  const opRepository = container.resolve(operationRepository)
  const eventLength = computed(() => state.events.length)
  const getList = computed(() => state.events)
  const getEvent = computed(() => state.event)
  const isLoading = computed(() => state.isLoading)
  const isEditing = computed(() => state.isEditing)
  const getPlaces = computed(() => state.places)
  const getNumberConfirmed  = computed(() => state.numberConfirmed)
  const isOtherSelecteced  = computed(() => state.isOtherSelecteced)
  const showModel = computed(() => state.showModel)  
  const showModelRemove = computed(() => state.showModelRemove)  
  const isTimeEnded = computed(() => state.isTimeEnded)  
  const confirmLabel = computed(() => state.confirmLabel)  
  const nextMonth = computed(() => state.nextMonth)  
  const filters = computed(() => state.filters) 
  const volunteersPresent = computed(()=> state.volunteersPresent);
  const shouldShowButton = computed(()=> state.shouldShowButton);
  const getData = async () => {
    state.isLoading = true
    const data = await repository.getEvents("")
    state.events = data.result
    state.isLoading = false;

  }

  const getById = async (id: string): Promise<void> => {
    const authStore = useAuthStore();
    state.isLoading = true
    state.isEditing = false
    state.showModel = false
    const data = await repository.getById(id);
    const dataVolunteers = await presenceRepository.getById(id);
    state.volunteersPresent = [];
    state.action = "D";
    dataVolunteers.result.forEach(f => state.volunteersPresent.push({
      presenceId: f.id,
      attented: true,
      id: f.volunteer.id, 
      name : f.volunteer.name,
      photo: f.volunteer.photo != null ? f.eventPresenceVolunteer.photo : ""
    }))

    state.event = data;
    state.initialEvent = data;
    state.numberConfirmed = state.volunteersPresent.length
    console.log(state.volunteersPresent.find((element) => element.id == authStore.user.id));
    state.shouldShowButton = state.volunteersPresent.find((element) => element.id == authStore.user.id) == null;
    const events = await repository.getEvents("");
    events.result.forEach(addIfNotExists);
    state.isLoading = false

}


  function addIfNotExists(item: event) {
    if (!state.places.includes(item.name)) {
      const index = state.places.indexOf("Outros");
      state.places.splice(index, 1)
      state.places.push(item.name);
      state.places.push("Outros");
    }
  }

  const filter = async () => {
    state.isLoading = true
    const data = await repository.getEvents(state.filters.name)
    state.events = data.result
    state.isLoading = false;
  }

  const edit = async ()  => {
    state.isEditing = true;
  }

  const cancel = async ()  => {
    if(state.action === "D"){
    state.isEditing = false;
    await getById(state.event.id);

    if(state.event.name !== "Outros")
      state.isOtherSelecteced = false;
    }
    else history.go(-1);
  }

  const save = async ()  => {
    state.isLoading = true
    var eventToSent = state.event;

    if(state.action === "D")
      await repository.update({
        id: eventToSent?.id,
        name: eventToSent?.name,
        description: eventToSent?.description,
        address: eventToSent?.address,
        city: eventToSent?.city,
        meetingPoint: eventToSent?.meetingPoint,
        occupancy : eventToSent?.occupancy,
        happenAt: eventToSent?.happenAt,
        status: 1
      });
    else
      await repository.create({
        name: eventToSent?.name,
        description: eventToSent?.description,
        address: eventToSent?.address,
        city: eventToSent?.city,
        meetingPoint: eventToSent?.meetingPoint,
        occupancy : eventToSent?.occupancy,
        happenAt: "2024-05-25T10:00:00Z",
        status: 1
      });
    state.isLoading = false
  }

  const confirmVacancy = async ()  => {
    state.isLoading = true
    state.showModel = false;
    const authStore = useAuthStore();
    await presenceRepository.create(state.event.id, authStore.user.id);
    state.isLoading = false
  }

  const finish = async ()  => {
    state.isLoading = true
    state.volunteersPresent.forEach(element => {
      if(element.attented)
        state.volunteersConfirmed.presences.push(element.id);
    });
    if(state.volunteersConfirmed.presences.length > 0)
      await repository.finish(state.event.id, state.volunteersConfirmed);
    
    state.showModel = false;
    state.isLoading = false;
  }

  const selectOther = (selected : boolean)=> {
    state.isOtherSelecteced = selected;

    if(selected)
      state.event.name = "";
  }

  const CreateNewEvent = () => {
    state.event = {id:""} as event;
    state.isLoading = false;
    state.isEditing = true;
    state.action = "C";
  }

  const removeVolunteer = (volunteer: any): void => {
    const index = state.volunteersPresent.indexOf(volunteer);
    state.volunteersDeleted.push(state.volunteersPresent[index]);
    state.volunteersPresent.splice(index, 1);
    console.log(state.volunteersDeleted);
    state.numberConfirmed = state.numberConfirmed -1;     
  }

  const saveVonlunteers = async ()  => {
    state.isLoading = true
    state.volunteersDeleted.forEach(element => {
      presenceRepository.delete(element.presenceId);
    });
    state.isLoading = false
  }

  const changeVolunteer = (volunteer): void => {

    const index = state.volunteersPresent.indexOf(volunteer);

    state.volunteersPresent[index].attented = !state.volunteersPresent[index].attented; 

      console.log(state.volunteersPresent);
  }

  let countDown = 5;

  const openModal = (open: boolean): void => {
    state.showModel = open;
    state.showModelRemove = open;
    state.isTimeEnded = !open;
    state.confirmLabel = "Confirmar (5)";
    countDown = 5;
    countDownTimer();
    let date = new Date();
    var newDate = new Date(date.setMonth(date.getMonth()+2));
    state.nextMonth = newDate.getMonth() +"/"+newDate.getFullYear()
  }

  function countDownTimer () {    
    if (countDown > 0) {
        setTimeout(() => {
            countDown -= 1
            state.confirmLabel = "Confirmar ("+countDown+")";
            countDownTimer()
        }, 1000)
    } else{
      state.isTimeEnded = true;
      state.confirmLabel = "Confirmar";
    }
  }

  const runProcess = async ()  => {
    state.showModel = true;
    state.isLoading = true;

    let date = new Date();
    var newDate = new Date(date.setMonth(date.getMonth()+2));
    var request = new createEventRequest(newDate);
    await opRepository.createEvents(request);

    const data = await repository.getEvents("")
    state.events = data.result

    state.showModel = false;
    state.isLoading = false;
  }

  const remove = async (event: event)  => {  
    state.isLoading = true;
    await repository.delete(event.id);

    const data = await repository.getEvents(state.filters.name)
    state.events = data.result

    state.showModelRemove = false;
  }
  const openModalRemove = async(event: event) => {  
    state.event = event;
    state.showModelRemove = true;
  }

  return {
    getData,
    eventLength,
    getList,
    isLoading,
    filter,
    filters,
    getEvent,
    getById,
    getPlaces,
    isEditing,
    getNumberConfirmed,
    edit,
    cancel,
    removeVolunteer,
    isOtherSelecteced,
    selectOther,
    save,
    changeVolunteer,
    finish,
    CreateNewEvent,
    showModel,
    showModelRemove,
    openModalRemove,
    openModal, 
    isTimeEnded,
    confirmLabel,
    confirmVacancy,
    saveVonlunteers,
    shouldShowButton,
    nextMonth,
    volunteersPresent,
    runProcess,
    remove
  }
})