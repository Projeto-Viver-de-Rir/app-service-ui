import { defineStore } from 'pinia'
import { container } from 'tsyringe'
import { computed, reactive } from 'vue'
import type { event, eventVolunteers} from '../entities/event'
import { eventFilter } from '../entities/eventFilter'
import { eventRepository } from '../repositories/eventRepository'

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
  volunteersPresent: number[],
  action: string
  showModel : boolean
  isTimeEnded: boolean,
  confirmLabel : string,
  nextMonth : string
}

export const useEvents = defineStore('events', () => {
  const state = reactive<eventState>({
    isLoading: true,
    showModel: false,
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
      "Outros"],
    event: null,
    initialEvent : null,
    isEditing: false,
    numberConfirmed: 0,
    isOtherSelecteced : false,
    volunteersPresent : [],
    action: "D",
    
  })
  const repository = container.resolve(eventRepository)
  const eventLength = computed(() => state.events.length)
  const getList = computed(() => state.events)
  const getEvent = computed(() => state.event)
  const isLoading = computed(() => state.isLoading)
  const isEditing = computed(() => state.isEditing)
  const getPlaces = computed(() => state.places)
  const getNumberConfirmed  = computed(() => state.numberConfirmed)
  const isOtherSelecteced  = computed(() => state.isOtherSelecteced)
  const showModel = computed(() => state.showModel)  
  const isTimeEnded = computed(() => state.isTimeEnded)  
  const confirmLabel = computed(() => state.confirmLabel)  
  const nextMonth = computed(() => state.nextMonth)  
  const filters = computed(() => state.filters) 
  const getData = async () => {
    state.isLoading = true
    const data = await repository.getEvents()
    state.events = data.events
    state.isLoading = false;

  }

  const getById = async (id: number): Promise<void> => {
    state.isLoading = true
    state.isEditing = false
    state.showModel = false
    const data = await repository.getById(id);
    state.event = data.event;  
    state.initialEvent = data.event;
    state.numberConfirmed = data.event.volunteers.length

    data.event.volunteers.forEach(populateVolunteersPresent)

    const events = await repository.getEvents();
    events.events.forEach(addIfNotExists);
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

  function populateVolunteersPresent(item: eventVolunteers) {
    state.volunteersPresent.push(item.id);
  }
  

  const filter = async () => {

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

    if(state.action === "D")
      await repository.update(state.event);
    else
      await repository.create(state.event);
    state.isLoading = false
  }

  const confirmVacancy = async ()  => {
    state.isLoading = true
    await repository.confirm(state.event.id);
    state.isLoading = false
  }


  const finish = async ()  => {
    state.isLoading = true
    await repository.finish(state.event.id, state.volunteersPresent);
    state.showModel = false;
    state.isLoading = false
  }

  const selectOther = (selected : boolean)=> {
    state.isOtherSelecteced = selected;

    if(selected)
      state.event.name = "";
  }

  const CreateNewEvent = () => {
    state.event = {id:0} as event;
    console.log(state.event);
    state.isLoading = false;
    state.isEditing = true;
    state.action = "C";
  }

  const removeVolunteer = (volunteer: any): void => {
    const index = state.event.volunteers.indexOf(volunteer);
    state.event.volunteers.splice(index, 1)   
    state.numberConfirmed = state.numberConfirmed -1;     
  }
  const changeVonlunteer = (id: number): void => {

    const index = state.volunteersPresent.indexOf(id);

    if(index == -1)
      state.volunteersPresent.push(id);
    else
      state.volunteersPresent.splice(index, 1);    
  }

  let countDown = 5;

  const openModal = (open: boolean): void => {
    state.showModel = open;
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
    changeVonlunteer,
    finish,
    CreateNewEvent,
    showModel,
    openModal, 
    isTimeEnded,
    confirmLabel,
    confirmVacancy,
    nextMonth
  }
})