﻿<template>
    <div>
        <h5>Ввод данных</h5>
        <div class="form-row">
            <div class="form-group col-md-3">
                <input type="text"
                       v-model.trim="newSurname"
                       class="form-control mt-2"
                       :class="{'warning-input':isErrorSurname}"
                       placeholder="Введите фамилию"
                       @change="checkNewSurname">
                <span class="warning" v-text="errorSurnameMessage"></span>
            </div>
            <div class="form-group col-md-3">
                <input type="text"
                       v-model.trim="newName"
                       class="form-control mt-2"
                       :class="{'warning-input':isErrorName}"
                       placeholder="Введите имя"
                       @change="checkNewName">
                <span class="warning" v-text="errorNameMessage"></span>
            </div>
            <div class="form-group col-md-3">
                <input type="text"
                       v-model.trim="newPhone"
                       class="form-control mt-2"
                       :class="{'warning-input':isErrorPhone}"
                       placeholder="Введите телефон"
                       @change="checkNewPhone">
                <span class="warning" v-text="errorPhoneMessage"></span>
            </div>
            <div class="form-group col-md-3">
                <button type="button"
                        class="btn btn-primary btn-icon mt-2"
                        @click="addNewContact">
                    <span class="icon">
                        <i class="fas fa-user-plus"></i>
                    </span>Добавить
                </button>
                <button class="btn btn-outline-primary mt-2" @click="newContactClear" type="button">Очистить</button>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                newId: 7,

                newSurname: "",
                errorSurnameMessage: null,
                isErrorSurname: false,

                newName: "",
                errorNameMessage: null,
                isErrorName: false,

                newPhone: "",
                errorPhoneMessage: null,
                isErrorPhone: false
            };
        },

        props: {
            hasPhoneNumber: {
                type: Boolean,
                required: true
            }
        },

        methods: {
            removeSurnameWarning() {
                this.errorSurnameMessage = null;
                this.isErrorSurname = false;
            },
            removeNameWarning() {
                this.errorNameMessage = null;
                this.isErrorName = false;
            },
            removePhoneWarning() {
                this.errorPhoneMessage = null;
                this.isErrorPhone = false;
            },
            checkNewSurname() {
                if (this.newSurname === "") {
                    this.errorSurnameMessage = "Введите фамилию!";
                    this.isErrorSurname = true;

                    return false;
                }

                this.removeSurnameWarning();

                return true;
            },
            checkNewName() {
                if (this.newName === "") {
                    this.errorNameMessage = "Введите имя!";
                    this.isErrorName = true;

                    return false;
                }

                this.removeNameWarning();

                return true;
            },
            isNumberExist() {
                this.$emit("check-exist-phone", this.newPhone);

                return this.hasPhoneNumber;
            },
            checkNewPhone() {
                if (this.newPhone === "") {
                    this.errorPhoneMessage = "Введите телефон!";
                    this.isErrorPhone = true;

                    return false;
                }

                if (!this.newPhone.match(/^\d+$/)) {
                    this.errorPhoneMessage = "Используйте только цифры!";
                    this.isErrorPhone = true;

                    return false;
                }

                if (this.isNumberExist()) {
                    this.errorPhoneMessage = "Такой номер уже есть!";
                    this.isErrorPhone = true;

                    return false;
                }

                this.removePhoneWarning();

                return true;
            },
            addNewContact() {
                this.errorNameMessage = null;
                this.errorSurnameMessage = null;
                this.errorPhoneMessage = null;

                this.isErrorSurname = false;

                var areNewDataReady = this.checkNewSurname() & this.checkNewName() & this.checkNewPhone();

                if (!areNewDataReady) {
                    return;
                }

                this.$emit("add-new-contact", {
                    id: this.newId,
                    surname: this.newSurname,
                    name: this.newName,
                    phone: this.newPhone,
                    checked: false,
                    isVisible: true
                });

                this.newId++;
                this.newSurname = "";
                this.newName = "";
                this.newPhone = "";
            },
            newContactClear() {
                this.newSurname = "";
                this.newName = "";
                this.newPhone = "";

                this.errorSurnameMessage = null;
                this.isErrorSurname = false;

                this.errorNameMessage = null;
                this.isErrorName = false;

                this.errorPhoneMessage = null;
                this.isErrorPhone = false;
            }
        }
    }
</script>