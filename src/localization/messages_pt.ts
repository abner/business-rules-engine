
class Localization {

    /*
     * Translated default messages for the validation engine.
     * Locale: EN (English; english)
     */
    static get ValidationMessages():any {
        return {
            required: "Campo requerido não foi informado.",
            remote: "Por favor ajuste o valor deste campo.",
            email: "Por favor, informe um email válido.",
            url: "Por favor, informe uma URL válida.",
            date: "A data informada não é uma data inválida.",
            dateISO: "A data informada não é uma data inválida ( ISO ).",
            number: "Por favor, informe um número válido.",
            digits: "Por favor, digite apenas dígitos.",
            signedDigits: "Por favor, informe apenas dígitos com sinal.",
            creditcard: "Por favor, informe um número de cartão de crédito válido.",
            equalTo: "O campo confirmação não corresponde.",
            maxlength: "Por favor, não digite mais do que {MaxLength} caracteres.",
            minlength: "Por favor, informe pelo menos {MinLength} caracteres.",
            rangelength: "Por favor, digite uma valor com ao menos {MinLength} e não mais que {MaxLength} caracteres.",
            range: "Por favor entre um valor entre {Min} e {Max}.",
            max: "Por favor, informe um valor menos ou igual a {Max}.",
            min: "Por favor, informe ao menos {Min} caracteres.",
            step: "Informe um valor com step {Step}.",
            contains: "Valor não correponde a um ítem na lista. Valor tentado '{AttemptedValue}'.",
            mask: "Por favor, informe um valor que corresponda à máscara {Mask}.",
            dateCompare: {
                Format: "DD/MM/YYYY",
                LessThan: "Por favor, entre uma data anterior a {CompareTo}.",
                LessThanEqual: "Por favor, entre uma data anterior ou igual a {CompareTo}.",
                Equal: "Por favor, entre uma  igual a {CompareTo}.",
                NotEqual: "Por favor, entre uma data diferente de {CompareTo}.",
                GreaterThanEqual: "Por favor, entre uma data  posterior ou igual a {CompareTo}.",
                GreaterThan: "Por favor, entre uma data posterior a {CompareTo}."
            },
            minItems:"Digite pelo menos {Min} items.",
            maxItems:"Número máximo de ítems ultrapassado: eram esperados não mais que {Max} items.",
            uniqItems:"Os ítems não podem ser repetidos.",
            enum:"Valor não corresponde a um ítem da lista.",
            type:"Digite um valor do tipo '{Type}'.",
            multipleOf:"Digite um valor que seja múltiplo de {Divider}."
        }
    }
}

export = Localization;
