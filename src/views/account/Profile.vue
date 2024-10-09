<script setup lang="ts">
import { computed, onMounted, reactive, ref } from "vue";

import BaseBreadcrumb from "@/components/shared/BaseBreadcrumb.vue";

import { storeToRefs } from 'pinia';
import { useAccountData } from "@/stores/accountStore";
import { useSnackBar } from "@/stores/snackBarStore";
import AvatarForm from "@/components/account/forms/AvatarForm.vue";
import { availabilityOptions } from "@/utils/form";
import { VTextField } from "vuetify/lib/components/index.mjs";

const page = ref({ title: "Meu Perfil" });
const locale = ref('pt-BR');
const formLabelClass = ref('text-subtitle-1 font-weight-semibold text-lightText mb-1');

const accountStore =  useAccountData()
const snackBarStore = useSnackBar()
const accountFormRef = ref();
const volunteerFormRef = ref();
const tab1Ref = ref();
const tab2Ref = ref();
const tab3Ref = ref();
const { account } = storeToRefs(accountStore);

interface AccountFormProps {
  tab: string;
	loading: boolean;
	accountModel: Record<string, any>;
  volunteerModel: Record<string, any>;
	accountFormValid: boolean;
	volunteerFormValid: boolean;
  showPasswordForm: boolean;
  lockEmailField: boolean;
  lockPhoneField: boolean;
  availability: Array<Record<string, any>>;
  checkedAvailabilities: Array<string>;
}

const data: AccountFormProps = reactive({
  tab: 'tab-1',
	loading: false,
	accountFormValid: false,
	volunteerFormValid: false,
	showPasswordForm: false,
  lockEmailField: true,
  lockPhoneField: true,
	accountModel: {
		contact: {
      email: '',
      phone: ''
    },
    password: {
      currentPassword: '',
      currentPasswordVisible: false,
      newPassword: '',
      newPasswordVisible: false,
      newPasswordConfirmation: '',
      newPasswordConfirmationVisible: false,
    },
	},
  volunteerModel: {
    identifier: "", 
    name: "",
    nickname: "",
    address: "",
    city: "",
    state: "",
    country: "",
    zip: "",
    birthDate: "",
    availability: "",
  },
  checkedAvailabilities: [],
  availability: availabilityOptions()
})

const breadcrumbs = ref([
	{
    text: "Dashboard",
    disabled: false,
    to: "/dashboard",
	},
	{
	text: `Configurações da Conta`,
    disabled: true,
	},
]);

const dateIsValid = computed(() => {
  return !!data.volunteerModel.birthDate;
});

const availabilityModel = computed(() => {
  return data.checkedAvailabilities.toString();
});

const formatDate = (date: Date) => {
	const day = date.getDate();
	const month = (date.getMonth() + 1).toString().padStart(2, "0");
	const year = date.getFullYear();

	return `${day}/${month}/${year}`;
};

const accountFormRules = ref({
  currentPassword: [
    (v: string): string | boolean => !!v || 'Senha Atual é obrigatório!',
  ],
  newPassword: [
    (v: string): string | boolean => !!v || 'Nova Senha é obrigatório!',
    (v: string) =>
    /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[^\w\s]).{6,}$/.test(v) || "Senha deve ter pelo menos 6 caracteres, uma letra maiúscula, uma minúscula, um número e um caractere especial",
  ],
  newPasswordConfirmation: [
    (v: string): string | boolean => !!v || 'Confirmação da Senha é obrigatório!',
    (v: string): string | boolean => v === data.accountModel.password.newPassword  || 'As senhas não coincidem!',
    (v: string) =>
    /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[^\w\s]).{6,}$/.test(v) || "Senha deve ter pelo menos 6 caracteres, uma letra maiúscula, uma minúscula, um número e um caractere especial",
  ],
  email: [
    (v: string): string | boolean => !!v || "E-mail é obrigatório",
    (v: string): string | boolean => /.+@.+\..+/.test(v) || "Insira um e-mail válido",
  ],
  phone: [
    (v: string) => !!v || "Celular é obrigatório",
    (v: string) => /\(?\d{2,}\)?[ -]?\d{4,}[\-\s]?\d{4}/.test(v) || "Insira um número de telefone válido",
  ],
})

const volunteerFormRules = ref({
  name: [
    (v: string): string | boolean => !!v || 'Nome é obrigatório!',
  ],
  nickname: [
    (v: string): string | boolean => !!v || 'Apelido é obrigatório!',
  ],
  identifier: [
    (v: string) => !!v || "CPF é obrigatório",
    (v: string) => /[0-9]{3}\.?[0-9]{3}\.?[0-9]{3}\-?[0-9]{2}$/.test(v) || "Insira um CPF válido",
  ],
  zip: [
    (v: string) => !!v || "CEP é obrigatório",
    (v: string) => /[0-9]{2}\.?[0-9]{3}\-?[0-9]{3}$/.test(v) || "Insira um CEP válido",
  ],
  address: [
    (v: string): string | boolean => !!v || 'Endereço é obrigatório!',
  ],
  city: [
    (v: string): string | boolean => !!v || 'Cidade é obrigatório!',
  ],
  state: [
    (v: string): string | boolean => !!v || 'Estado é obrigatório!',
  ],
  country: [
    (v: string): string | boolean => !!v || 'País é obrigatório!',
  ],
})

const hasPasswordFilled = computed(() => {
  return !!data.accountModel.password.currentPassword &&
    !!data.accountModel.password.newPassword;
});

const resetAccountForm = () => {
  data.accountModel.password.newPassword = '';
	data.accountModel.password.newPasswordConfirmation = '';
	data.accountModel.password.currentPasswordVisible =  false;
	data.accountModel.password.newPasswordVisible =  false;
	data.accountModel.password.newPasswordConfirmationVisible = false;
  data.showPasswordForm = false;
  data.lockEmailField = true;
  data.lockPhoneField = true;
  accountFormRef.value.resetValidation();
  setAccountModel(account.value);
};

const resetVolunteerForm = () => {
  setVolunteerModel(account.value?.volunteer);
  resetAccountForm();
  data.tab = 'tab-1';
  volunteerFormRef.value.resetValidation();
};

const prepareVolunteerModelToSubmit = () => {
	return {
    identifier: data.volunteerModel.identifier,
    name: data.volunteerModel.name,
    nickname: data.volunteerModel.nickname,
    address: data.volunteerModel.address,
    city: data.volunteerModel.city,
    state: data.volunteerModel.state,
    country: data.volunteerModel.country,
    zip: data.volunteerModel.zip,
    birthDate: data.volunteerModel.birthDate,
    availability: availabilityModel.value,
	}
};

const prepareAccountModelToSubmit = () => {
	return {
		email: data.accountModel.contact.email,
		phone: data.accountModel.contact.phone,
    ...( hasPasswordFilled.value ? { 
        changePassword: {
          currentPassword: data.accountModel.password.currentPassword,
          newPassword: data.accountModel.password.newPassword,
        }
      } : {}
    ),
	}
};

const setAccountModel = (account: any) => {
	data.accountModel.contact.email = account.email;
	data.accountModel.contact.phone = account.phone;
};

const setVolunteerModel = (volunteer: any) => {
  data.volunteerModel.identifier = volunteer.identifier
  data.volunteerModel.name = volunteer.name
  data.volunteerModel.nickname = volunteer.nickname
  data.volunteerModel.address = volunteer.address
  data.volunteerModel.city = volunteer.city
  data.volunteerModel.state = volunteer.state
  data.volunteerModel.country = volunteer.country
  data.volunteerModel.zip = volunteer.zip
  data.volunteerModel.birthDate = volunteer.birthDate
  data.volunteerModel.availability = volunteer.availability
  if (volunteer.availability) {
    data.checkedAvailabilities = volunteer.availability.split(',')
  };
};

const toogleAvailabilityIfExists = (value: string) => {
  if(data.checkedAvailabilities.indexOf(value) > -1) {
  data.checkedAvailabilities = data.checkedAvailabilities.filter((item) => item !== value)
 }
}

const validateAccountFormThenSubmit = async () => {
	const { valid } = await accountFormRef.value.validate()
	if (valid) {
		submitAccount();
	}
};

const findInputIdByTab = async (elementId: string) => {
  const tabs = [
  {
    id: 'tab-2',
    element: tab2Ref,
  },
  {
    id: 'tab-3',
    element: tab3Ref,
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

const validateVolunteerFormThenSubmit = async () => {
	const { valid, errors } = await volunteerFormRef.value.validate()
	if (valid) {
		submitVolunteer();
	} else {
    findInputIdByTab(errors[0].id);
  }
};

const submitAccount = async (): Promise<void> => {
	data.loading = true;
	try {
		const accountToUpdate = prepareAccountModelToSubmit();
    await accountStore.updateAccount(accountToUpdate as any);
		snackBarStore.addToQueue({ 
			color: 'success', 
			message: 'Conta atualizada com sucesso.'
		});
    setAccountModel(account.value as any)
	} catch (error) {
		snackBarStore.addToQueue({ 
			color: 'error', 
			message: 'Não foi possível atualizar os dados da conta.'
		});
	}
	data.loading = false;
}

const submitVolunteer = async (): Promise<void> => {
	data.loading = true;
	try {
		const volunteerToUpdate = prepareVolunteerModelToSubmit();
		await accountStore.updateVolunteer(volunteerToUpdate);
		snackBarStore.addToQueue({ 
			color: 'success', 
			message: 'Perfil atualizado com sucesso.'
		});
    setVolunteerModel(account.value?.volunteer);
	} catch (error) {
		snackBarStore.addToQueue({ 
			color: 'error', 
			message: 'Não foi possível atualizar os dados da conta.'
		});
	}
	data.loading = false;
}

onMounted(async () => {
  try {
    await setAccountModel(account.value);
    await setVolunteerModel(account.value?.volunteer);
  } catch (error) {
    snackBarStore.addToQueue({ 
      color: 'error', 
      message: 'Não foi possível recurerar os dados do usuário.'
    });
  }
});
</script>

<template>
  <div class="profile-view pa-5">
    <div v-if="data.loading" class="loading" />
    <BaseBreadcrumb
      :title="page.title"
      :breadcrumbs="breadcrumbs"
    ></BaseBreadcrumb>
			<div class="tabs-container">
				<v-tabs
					v-model="data.tab"
					color="primary"
				>
					<v-tab text="Conta" value="tab-1" />
					<v-tab text="Essenciais" value="tab-2" />
					<v-tab text="Localidade" value="tab-3" />
					<v-tab text="Disponibilidade" value="tab-4" />
				</v-tabs>
			</div>

			<v-row class="mt-4">
				<v-col cols="12" md="12">
          <v-window v-model="data.tab">
            <v-form v-model="data.accountFormValid" 
                    class="form-container" 
                    ref="accountFormRef" 
                    @submit.prevent="validateAccountFormThenSubmit">
              <v-window-item value="tab-1" ref="tab1Ref">
                <v-row>
                  <v-col md="6" sm="12">
                    <v-card elevation="0" 
                            class="rounded border">
                      <v-card-item class="pb-0">
                        <template v-slot:title>
                          <h5 class="text-h5">Foto</h5>
                        </template>
                        <template v-slot:subtitle>
                          <div class="text-subtitle-1 text-medium-emphasis mt-2">Selecione uma nova foto para seu perfil</div>
                        </template>
                      </v-card-item>
                      <AvatarForm :noHeader="true" />
                    </v-card>
                  </v-col>
                  <v-col md="6" sm="12">
                    <v-card elevation="0" 
                            class="rounded border">
                      <v-card-item class="pb-0">
                        <template v-slot:title>
                          <h5 class="text-h5">Alterar Senha</h5>
                        </template>
                        <template v-slot:subtitle>
                          <div class="text-subtitle-1 text-medium-emphasis mt-2">Para alterar sua senha, utilize os três campos</div>
                        </template>
                      </v-card-item>
                      <v-card-text class="px-8 py-5 position-relative">
                        <div class="form-overlay" v-if="!data.showPasswordForm">
                          <v-btn variant="text"
                                prepend-icon="mdi-lock-outline"
                                @click="data.showPasswordForm = !data.showPasswordForm">
                            <span class="font-weight-bold">Alterar senha</span>
                          </v-btn>
                        </div>
                        <div class="form-property-data mb-3">
                          <v-label :class="[formLabelClass, 'required']">Senha Atual</v-label>
                          <VTextField
                            v-model="data.accountModel.password.currentPassword"
                            :append-inner-icon="data.accountModel.password.currentPasswordVisible ? 'mdi-eye-off' : 'mdi-eye'"
                            :type="data.accountModel.password.currentPasswordVisible ? 'text' : 'password'"
                            placeholder="Insira sua senha atual"
                            variant="outlined"
                            @click:append-inner="data.accountModel.password.currentPasswordVisible = !data.accountModel.password.currentPasswordVisible"
                            :rules="data.showPasswordForm ? accountFormRules.currentPassword : []"
                            :required="!data.showPasswordForm"
                          />
                        </div>
                        <div class="form-property-data mb-3">
                          <v-label :class="[formLabelClass, 'required']">Nova Senha</v-label>
                          <VTextField
                            v-model="data.accountModel.password.newPassword"
                            :append-inner-icon="data.accountModel.password.newPasswordVisible ? 'mdi-eye-off' : 'mdi-eye'"
                            :type="data.accountModel.password.newPasswordVisible ? 'text' : 'password'"
                            placeholder="Insira a nova senha"
                            variant="outlined"
                            @click:append-inner="data.accountModel.password.newPasswordVisible = !data.accountModel.password.newPasswordVisible"
                            :rules="data.showPasswordForm ? accountFormRules.newPassword : []"
                            :required="!data.showPasswordForm"
                          />
                        </div>
                        <div class="form-property-data mb-1">
                          <v-label :class="[formLabelClass, 'required']">Confirme Nova Senha</v-label>
                          <v-text-field
                            v-model="data.accountModel.password.newPasswordConfirmation"
                            :append-inner-icon="data.accountModel.password.newPasswordConfirmationVisible ? 'mdi-eye-off' : 'mdi-eye'"
                            :type="data.accountModel.password.newPasswordConfirmationVisible ? 'text' : 'password'"
                            placeholder="Confirme a nova senha"
                            variant="outlined"
                            :disabled="!data.accountModel.password.newPassword"
                            @click:append-inner="data.accountModel.password.newPasswordConfirmationVisible = !data.accountModel.password.newPasswordConfirmationVisible"
                            :rules="data.showPasswordForm ? accountFormRules.newPasswordConfirmation : []"
                            :required="!data.showPasswordForm"
                          ></v-text-field>
                        </div>
                      </v-card-text>
                    </v-card>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="12" md="12">
                    <v-card elevation="0" 
                            class="rounded border">
                      <v-card-item class="pb-0">
                        <template v-slot:title>
                          <h5 class="text-h5">Contato</h5>
                        </template>
                        <template v-slot:subtitle>
                          <div class="text-subtitle-1 text-medium-emphasis mt-2">Altere aqui a forma de comunicação com a ONG.</div>
                        </template>
                      </v-card-item>
                      <v-card-item>
                        <v-row>
                          <v-col md="6" sm="12">
                            <v-label :class="[formLabelClass, 'required']">E-mail</v-label>
                            <VTextField
                              color="primary"
                              variant="outlined"
                              type="email"
                              v-model="data.accountModel.contact.email"
                              :rules="accountFormRules.email"
                              required
                            >
                              <div class="form-overlay" v-if="!!data.accountModel.contact.email && data.lockEmailField">
                                <v-btn variant="text"
                                      prepend-icon="mdi-lock-outline"
                                      @click="data.lockEmailField = !data.lockEmailField">
                                  <span class="font-weight-bold">Alterar e-mail</span>
                                </v-btn>
                              </div>
                            </VTextField>
                          </v-col>
                          <v-col md="6" sm="12">
                            <v-label :class="[formLabelClass, 'required']">Celular</v-label>
                            <VTextField
                              color="primary"
                              variant="outlined"
                              type="tel"
                              v-model="data.accountModel.contact.phone"
                              :rules="accountFormRules.phone"
                              v-maska="'(##) #####-####'"
                             >                              
                             <div class="form-overlay" v-if="!!data.accountModel.contact.phone && data.lockEmailField">
                                <v-btn variant="text"
                                       prepend-icon="mdi-lock-outline"
                                       @click="data.lockEmailField = !data.lockEmailField">
                                  <span class="font-weight-bold">Alterar celular</span>
                                </v-btn>
                              </div>
                            </VTextField>
                          </v-col>
                        </v-row>
                      </v-card-item>
                    </v-card>
                  </v-col>
                </v-row>
                <!-- Account Form Actions -->
                <v-col cols="12" md="12">
                  <v-card elevation="0" class="">
                      <v-card-actions class="pa-6">
                        <v-spacer></v-spacer>
                        <v-btn color="error darken-1" 
                               variant="tonal" 
                               size="large"
                               @click="resetAccountForm">
                          Cancelar
                        </v-btn>
                        <v-btn size="large"
                              color="primary" 
                              variant="tonal"
                              type="submit"
                              :disabled="!data.accountFormValid">
                          Salvar
                        </v-btn>
                      </v-card-actions>
                  </v-card>
                </v-col>
              </v-window-item>
            </v-form>
            <v-form v-model="data.volunteerFormValid" 
                    class="form-container" 
                    ref="volunteerFormRef" 
                    @submit.prevent="validateVolunteerFormThenSubmit">
              <v-window-item value="tab-2" ref="tab2Ref">
                <v-card elevation="0" class="rounded border" style="z-index: 1">
                  <v-card-item class="pb-8">
                    <template v-slot:title>
                      <h5 class="text-h5">Essenciais</h5>
                    </template>
                  </v-card-item>
                  <v-card-text class="px-8 pb-6">
                    <div class="form-property-data mb-4">
                      <v-label :class="[formLabelClass, 'required']">Nome</v-label>
                      <v-text-field
                        v-model="data.volunteerModel.name"
                        placeholder="Seu nome completo"
                        :rules="volunteerFormRules.name"
                        required
                      >
                      </v-text-field>
                    </div>
                    <div class="form-property-data mb-4">
                      <v-label :class="[formLabelClass, 'required']">Apelido</v-label>
                      <v-text-field
                        v-model="data.volunteerModel.nickname"
                        placeholder="Como você é conhecido?"
                        :rules="volunteerFormRules.nickname"
                        required
                      ></v-text-field>
                    </div>
                    <div class="form-property-data mb-4">
                      <v-label :class="[formLabelClass, 'required']">CPF</v-label>
                      <VTextField
                        v-model="data.volunteerModel.identifier"
                        placeholder="Seu CPF"
                        v-maska="'###.###.###-##'"
                        :rules="volunteerFormRules.identifier"
                        required />
                    </div>
                    <div class="mb-5">
                      <v-label :class="[formLabelClass, 'required']">Data de Nascimento</v-label>
                      <VueDatePicker
                        v-model="data.volunteerModel.birthDate"
                        :locale="locale"
                        :format="formatDate"
                        :enable-time-picker="false"
                        :state="dateIsValid"
                      />
                      <div class="ml-4 mt-1 validation-message" v-if="!dateIsValid">Data de nascimento é obrigatória!</div>
                    </div>
                  </v-card-text>
                </v-card>
                <!-- Actions Form Essencials -->
                <v-col cols="12" md="12">
                  <!-- Needed style hack to prevent calendar from disapearing (?) -->
                  <v-card elevation="0" style="padding-bottom: 15rem;"> 
                      <v-card-actions class="pa-6">
                        <v-spacer></v-spacer>
                        <v-btn color="error darken-1" 
                               variant="tonal" 
                               size="large"
                               @click="resetVolunteerForm">
                          Cancelar
                        </v-btn>
                        <v-btn size="large"
                              color="primary" 
                              variant="tonal"
                              type="submit"
                              :disabled="!data.volunteerFormValid">
                          Salvar
                        </v-btn>
                      </v-card-actions>
                  </v-card>
                </v-col>
              </v-window-item>

              <v-window-item value="tab-3" ref="tab3Ref">
                <v-row>
                  <v-col cols="12" md="12">
                    <v-card elevation="0" class="rounded border">
                      <v-card-item class="pb-8">
                        <template v-slot:title>
                          <h5 class="text-h5">Localidade</h5>
                        </template>
                      </v-card-item>
                      <v-card-text class="px-8">
                        <div class="form-property-data mb-4">
                          <v-label :class="[formLabelClass, 'required']">CEP</v-label>
                          <VTextField
                            v-model="data.volunteerModel.zip"
                            placeholder="92420-000"
                            :rules="volunteerFormRules.zip"
                            v-maska="'#####-###'"
                            required
                          />
                        </div>
                        <div class="form-property-data mb-4">
                          <v-label :class="[formLabelClass, 'required']">Endereço</v-label>
                          <v-text-field
                            v-model="data.volunteerModel.address"
                            placeholder="Av. Dezessete de Abril, 36 - Guajuviras"
                            :rules="volunteerFormRules.address"
                            required
                          ></v-text-field>
                        </div>
                        <div class="form-property-data mb-4">
                          <v-label :class="[formLabelClass, 'required']">Cidade</v-label>
                          <v-text-field
                            v-model="data.volunteerModel.city"
                            placeholder="Canoas"
                            :rules="volunteerFormRules.city"
                            required
                          ></v-text-field>
                        </div>
                        <div class="form-property-data mb-4">
                          <v-label :class="[formLabelClass, 'required']">Estado</v-label>
                          <v-text-field
                            v-model="data.volunteerModel.state"
                            placeholder="RS"
                            :rules="volunteerFormRules.state"
                            required
                          ></v-text-field>
                        </div>
                        <div class="form-property-data">
                          <v-label :class="[formLabelClass, 'required']">País</v-label>
                          <v-text-field
                            v-model="data.volunteerModel.country"
                            placeholder="Brasil"
                            :rules="volunteerFormRules.country"
                            required
                          ></v-text-field>
                        </div>
                      </v-card-text>
                    </v-card>
                  </v-col>
                </v-row>
                <!-- Actions Form Address -->
                <v-col cols="12" md="12">
                  <v-card elevation="0" class="">
                      <v-card-actions class="pa-6">
                        <v-spacer></v-spacer>
                        <v-btn color="error darken-1" 
                               variant="tonal" 
                               size="large"
                               @click="resetVolunteerForm">
                          Cancelar
                        </v-btn>
                        <v-btn size="large"
                              color="primary" 
                              variant="tonal"
                              type="submit"
                              :disabled="!data.volunteerFormValid">
                          Salvar
                        </v-btn>
                      </v-card-actions>
                  </v-card>
                </v-col>
              </v-window-item>

              <v-window-item value="tab-4">
                <v-row>
                  <v-col cols="12" md="12">
                    <v-card elevation="0" class="rounded border">
                      <v-card-item class="pb-8">
                        <template v-slot:title>
                          <h5 class="text-h5">Disponibilidade</h5>
                        </template>
                      </v-card-item>
                      <v-card-text class="px-8">
                        <div class="availability-container px-5">
                          <v-radio-group v-model="data.checkedAvailabilities">
                            <v-radio
                              v-for="(option, index) in data.availability"
                              :key="index"
                              multiple
                              color="primary"
                              class="px-3 py-3 border rounded"
                              :label="option.label"
                              :value="option.value"
                              @click="toogleAvailabilityIfExists(option.value)"
                            ></v-radio>
                          </v-radio-group>
                        </div>
                      </v-card-text>
                    </v-card>
                  </v-col>
                </v-row>
                <!-- Actions Form Availability -->
                <v-col cols="12" md="12">
                  <v-card elevation="0" class="">
                      <v-card-actions class="pa-6">
                        <v-spacer></v-spacer>
                        <v-btn color="error darken-1" 
                               variant="tonal" 
                               size="large"
                               @click="resetVolunteerForm">
                          Cancelar
                        </v-btn>
                        <v-btn size="large"
                              color="primary" 
                              variant="tonal"
                              type="submit"
                              :disabled="!data.volunteerFormValid">
                          Salvar
                        </v-btn>
                      </v-card-actions>
                  </v-card>
                </v-col>
              </v-window-item>
            </v-form>
          </v-window>
				</v-col>
			</v-row>
  </div>
</template>
<style lang="scss" scoped>
/* Hack to fix Vuetify not setting xs style on the current version */
/* ToDo: upgrade Vuetify version on the future */
@media (max-width: 480px) {
  .v-col-xs-3 {
    flex: 0 0 25%;
    max-width: 25%;
  }
  .v-col-xs-9 {
    flex: 0 0 75%;
    max-width: 75%;
  }
  .v-col-xs-12 {
    flex: 0 0 100%;
    max-width: 100%;
  }
}

@media (max-width: 600px) {
  .v-col-sm-3 {
    flex: 0 0 25%;
    max-width: 25%;
  }
  .v-col-sm-12 {
    flex: 0 0 100%;
    max-width: 100%;
  }
}

@media (min-width: 960px) {
  .v-col-md-2 {
    flex: 0 0 16.6666666667%;
    max-width: 16.6666666667%;
  }
  .v-col-md-3 {
    flex: 0 0 25%;
    max-width: 25%;
  }
  .v-col-md-5 {
    flex: 0 0 41.6666666667%;
    max-width: 41.6666666667%;
  }
}
.validation-message {
	color: rgb(var(--v-theme-error));
}
.form-overlay {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  opacity: 0.8;
  background-color: white;
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
  button {
    height: 100%;
    width: 100%;
  }
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
:deep(.v-tab__slider) {
  height: 0;
}
:deep(.v-selection-control-group) {
  flex-direction: row;
  gap: 10px;
  width: inherit;
  justify-content: flex-start;
  flex-wrap: wrap;
  @media (max-width: 600px) {
    justify-content: center;
  }
}
:deep(.v-selection-control) {
  min-width: 150px;
  max-width: 150px;
}
</style>
