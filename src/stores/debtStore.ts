import { defineStore } from 'pinia'
import { container } from 'tsyringe'
import { computed, reactive } from 'vue'
import type { Debt } from '../entities/Debts'
import { DebtFilter} from '../entities/debtFilter'
import { DebtRepository } from '../repositories/DebtRepository'

interface eventState {
    event: Debt | null,
    initialEvent: Debt | null,
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