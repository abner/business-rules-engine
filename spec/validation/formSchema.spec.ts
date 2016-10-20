let expect = require('expect.js');

import * as _ from 'lodash';
import { FormSchema } from './../../src/index';

import Q = require('q');

interface IPerson {
  Checked: boolean;
  FirstName: string;
  LastName: string;
  Contacts: Array<IContact>;
}
interface IContact {
  Email: string;
  Mobile: IPhone;
  FixedLine: IPhone;
}
interface IPhone {
  CountryCode: string;
  Number: string;
}

describe('JsonSchemaRuleFactory', function () {
  // JSOM form schema
  let formSchema = {
    FirstName: {
      type: 'string',
      title: 'First name',
      required: 'true',
      maxLength: 15
    },
    LastName: {
      type: 'string',
      'title': 'Last name',
      required: true,
      maxLength: 15
    },
    Contacts: {
      type: 'array',
      maxItems: 4,
      minItems: 2,
      items: {
        type: 'object',
        properties: {
          Email: {
            type: 'string',
            title: 'Email',
            default: '',
            required: true,
            maxLength: 100,
            email: true
          },
          Mobile: {
            type: 'object',
            properties: {
              CountryCode: {
                type: 'string',
                title: 'Country code',
                required: true,
                maxLength: 3,
                enum: ['FRA', 'CZE', 'USA', 'GER']
              },
              Number: {
                type: 'string',
                title: 'Phone number',
                required: true,
                maxLength: 9
              }
            }
          },
          FixedLine: {
            type: 'object',
            properties: {
              CountryCode: {
                type: 'string',
                title: 'Country code',
                required: true,
                maxLength: 3,
                enum: ['FRA', 'CZE', 'USA', 'GER']
              },
              Number: {
                type: 'string',
                title: 'Phone number',
                required: true,
                maxLength: 9
              }
            }
          }
        }
      }
    }
  };


  //
  let getItemDataTemplate = function () {
    let item = FormSchema.Util.InitValues(formSchema.Contacts.items.properties);

    item.Email = 'mail@gmail.com';
    item.Mobile.CountryCode = 'CZE';
    item.Mobile.Number = '736483690';
    item.FixedLine.CountryCode = 'USA';
    item.FixedLine.Number = '736483690';

    return item;
  };

  beforeEach(function () {

    this.FormSchema = formSchema;
    this.Data = FormSchema.Util.InitValues(this.FormSchema);

    this.Data.FirstName = 'John';
    this.Data.LastName = 'Smith';

    this.MainValidator = new FormSchema.JsonSchemaRuleFactory(this.FormSchema).CreateRule('Main');


  });

  describe('email', function () {

    it('fill no email', function () {

      debugger;

      // when
      this.Data.Contacts.push(getItemDataTemplate());
      this.Data.Contacts[0] = {};


      // exec
      let result = this.MainValidator.Validate(this.Data);

      console.error('RESULT', result);

      // verify
      expect(result.Errors['Contacts'].Children[0].Errors['Email'].HasErrors).to.equal(true);
    });

  //   it('fill wrong email', function () {
  //     // when
  //     this.Data.Contacts.push(getItemDataTemplate());
  //     this.Data.Contacts[0].Email = 'jsmith.com';

  //     // exec
  //     let result = this.MainValidator.Validate(this.Data);

  //     // verify
  //     expect(result.Errors['Contacts'].Children[0].Errors['Email'].HasErrors).to.equal(true);
  //   });

  //   it('fill some email', function () {
  //     // when
  //     this.Data.Contacts.push(getItemDataTemplate());
  //     this.Data.Contacts[0].Email = 'jsmith@gmail.com';

  //     // exec
  //     let result = this.MainValidator.Validate(this.Data);

  //     // verify
  //     expect(result.Errors['Contacts'].Children[0].Errors['Email'].HasErrors).to.equal(false);
  //   });
  // });

  // //    it('form values - parsing', function () {
  // //
  // //        let personData = FormSchema.Util.GetFormValues(this.FormSchema);
  // //        console.log(JSON.stringify(personData));
  // //
  // //        let contactRow = FormSchema.Util.GetFormValues(this.FormSchema.Contacts.items.properties);
  // //        console.log(JSON.stringify(contactRow));
  // //    });
  // //
  // //    it('form rules', function () {
  // //
  // //        let personData = FormSchema.Util.GetAbstractRule(this.FormSchema);
  // //        console.log(JSON.stringify(personData));
  // //
  // //
  // ////        let contactRow = FormSchema.Util.GetFormValues(this.FormSchema.Person.properties.Contacts.items.properties);
  // ////        console.log(JSON.stringify(contactRow));
  // //    });

  // it('fill undefined - some errors', function () {

  //   // when
  //   this.Data.Contacts = undefined;

  //   // excercise
  //   let result = this.MainValidator.Validate(this.Data);

  //   // verify
  //   expect(result.HasErrors).to.equal(true);

  // });

  // it('fill 1 item - minItems errors', function () {

  //   // when
  //   this.Data.Contacts.push(getItemDataTemplate());

  //   // excercise
  //   let result = this.MainValidator.Validate(this.Data);

  //   // verify
  //   expect(result.Errors['Contacts'].ValidationFailures['minItems'].HasError).to.equal(true);

  // });

  // it('fill 5 items - maxItems errors', function () {

  //   // when
  //   this.Data.Contacts.push(getItemDataTemplate());
  //   this.Data.Contacts.push(getItemDataTemplate());
  //   this.Data.Contacts.push(getItemDataTemplate());
  //   this.Data.Contacts.push(getItemDataTemplate());
  //   this.Data.Contacts.push(getItemDataTemplate());


  //   // excercise
  //   let result = this.MainValidator.Validate(this.Data);

  //   // verify
  //   expect(result.Errors['Contacts'].ValidationFailures['maxItems'].HasError).to.equal(true);

  // });

  // it('fill correct data - no errors', function () {

  //   // when
  //   this.Data.Contacts.push(getItemDataTemplate());
  //   this.Data.Contacts.push(getItemDataTemplate());
  //   this.Data.Contacts.push(getItemDataTemplate());

  //   // excercise
  //   let result = this.MainValidator.Validate(this.Data);

  //   // verify
  //   expect(result.HasErrors).to.equal(false);

  // });


  // it('fill incorrect data - some errors', function () {

  //   // when
  //   this.Data.Contacts.push(getItemDataTemplate());
  //   this.Data.Contacts.push(getItemDataTemplate());
  //   this.Data.Contacts.push(getItemDataTemplate());

  //   // simulate error at second item in list
  //   this.Data.Contacts[1].Email = '';

  //   // simulate async error at third item in list
  //   this.Data.Contacts[2].Mobile.CountryCode = 'BLA';

  //   // excercise
  //   let result = this.MainValidator.Validate(this.Data);

  //   // verify
  //   expect(result.HasErrors).to.equal(true);
  //   expect(result.Errors['Contacts'].HasErrors).to.equal(true);
  //   expect(result.Errors['Contacts'].Children[0].HasErrors).to.equal(false);
  //   expect(result.Errors['Contacts'].Children[1].HasErrors).to.equal(true);
  //   expect(result.Errors['Contacts'].Children[2].HasErrors).to.equal(true);

  // });

  // it('delete error item, leave correct item - no errors', function () {

  //   // when
  //   this.Data.Contacts.push(getItemDataTemplate());
  //   this.Data.Contacts.push(getItemDataTemplate());
  //   this.Data.Contacts.push(getItemDataTemplate());

  //   // item list property error
  //   this.Data.Contacts[2].Email = '';

  //   // item list async property error
  //   this.Data.Contacts[2].Mobile.CountryCode = 'BLA';

  //   // delete last error item
  //   this.Data.Contacts.splice(2, 1);

  //   // excercise
  //   let result = this.MainValidator.Validate(this.Data);

  //   // verify
  //   expect(result.HasErrors).to.equal(false);
  //   expect(result.Errors['Contacts'].HasErrors).to.equal(false);
  //   expect(result.Errors['Contacts'].Children[0].HasErrors).to.equal(false);
  //   expect(result.Errors['Contacts'].Children[1].HasErrors).to.equal(false);


  // });

  // it('delete correct item, leave error item - some errors', function () {

  //   // when
  //   this.Data.Contacts.push(getItemDataTemplate());
  //   this.Data.Contacts.push(getItemDataTemplate());
  //   this.Data.Contacts.push(getItemDataTemplate());

  //   // item list property error
  //   this.Data.Contacts[2].Email = '';

  //   // item list async property error
  //   this.Data.Contacts[2].Mobile.CountryCode = 'BLA';

  //   // delete correct item
  //   this.Data.Contacts.splice(1, 1);

  //   // excercise
  //   let result = this.MainValidator.Validate(this.Data);

  //   // verify
  //   expect(result.HasErrors).to.equal(true);
  //   expect(result.Errors['Contacts'].HasErrors).to.equal(true);
  //   expect(result.Errors['Contacts'].Children[0].HasErrors).to.equal(false);
  //   expect(result.Errors['Contacts'].Children[1].HasErrors).to.equal(true);


  // });
});

// describe('JQueryValidationRuleFactory', function () {
//   // define data structure + validation rules meta data
//   let metaData = {
//     FirstName: {
//       rules: { required: true, maxlength: 15 },
//       label: 'Email'
//     },
//     LastName: {
//       rules: { required: true, maxlength: 15 }
//     },
//     NickName: {
//       label: 'Nick name'
//     },
//     Contacts: [
//       {
//         Email: {
//           label: 'Email',
//           rules: {
//             required: true,
//             maxlength: 100,
//             email: true
//           }
//         },
//         Mobile: {
//           CountryCode: {
//             rules: { required: true, maxlength: 3, enum: ['FRA', 'CZE', 'USA', 'GER'] }describe('JQueryValidationRuleFactory', function () {
//   // define data structure + validation rules meta data
//   let metaData = {
//     FirstName: {
//       rules: { required: true, maxlength: 15 },
//       label: 'Email'
//     },
//     LastName: {
//       rules: { required: true, maxlength: 15 }
//     },
//     NickName: {
//       label: 'Nick name'
//     },
//     Contacts: [
//       {
//         Email: {
//           label: 'Email',
//           rules: {
//             required: true,
//             maxlength: 100,
//             email: true
//           }
//         },
//         Mobile: {
//           CountryCode: {
//             rules: { required: true, maxlength: 3, enum: ['FRA', 'CZE', 'USA', 'GER'] }
//           },
//           Number: {
//             rules: { required: true, maxlength: 9 }
//           }
//         },
//         FixedLine: {
//           CountryCode: {
//             rules: { required: true, maxlength: 3, enum: ['FRA', 'CZE', 'USA', 'GER'] }
//           },
//           Number: {
//             rules: { required: true, maxlength: 9 }
//           }
//         }
//       }, { maxItems: 4, minItems: 2 }
//     ]
//   };

//   // setup
//   let getData = function () {
//     return {
//       Checked: true,
//       FirstName: 'John',
//       LastName: 'Smith',
//       Contacts: []
//     };
//   };

//   //
//   let getItemDataTemplate = function () {
//     return {
//       Email: 'mail@gmail.com',
//       Mobile: {
//         CountryCode: 'CZE',
//         Number: '736483690'
//       },
//       FixedLine: {
//         CountryCode: 'USA',
//         Number: '736483690'
//       }
//     };
//   };

//   beforeEach(function () {

//     this.Data = getData();

//     this.Data.FirstName = 'John';
//     this.Data.LastName = 'Smith';
//     this.MainValidator = new FormSchema.JQueryValidationRuleFactory(metaData).CreateRule('Main');


//   });

//   describe('email', function () {

//     it('fill no email', function () {
//       // when
//       this.Data.Contacts.push(getItemDataTemplate());
//       this.Data.Contacts[0] = {};

//       // exec
//       let result = this.MainValidator.Validate(this.Data);

//       // verify
//       expect(result.Errors['Contacts'].Children[0].Errors['Email'].HasErrors).to.equal(true);
//     });

//     it('fill wrong email', function () {
//       // when
//       this.Data.Contacts.push(getItemDataTemplate());
//       this.Data.Contacts[0].Email = 'jsmith.com';

//       // exec
//       let result = this.MainValidator.Validate(this.Data);

//       // verify
//       expect(result.Errors['Contacts'].Children[0].Errors['Email'].HasErrors).to.equal(true);
//     });

//     it('fill some email', function () {
//       // when
//       this.Data.Contacts.push(getItemDataTemplate());
//       this.Data.Contacts[0].Email = 'jsmith@gmail.com';

//       // exec
//       let result = this.MainValidator.Validate(this.Data);

//       // verify
//       expect(result.Errors['Contacts'].Children[0].Errors['Email'].HasErrors).to.equal(false);
//     });
//   });

//   //    it('form values - parsing', function () {
//   //
//   //        let personData = FormSchema.Util.GetFormValues(this.FormSchema);
//   //        console.log(JSON.stringify(personData));
//   //
//   //        let contactRow = FormSchema.Util.GetFormValues(this.FormSchema.Contacts.items.properties);
//   //        console.log(JSON.stringify(contactRow));
//   //    });
//   //
//   //    it('form rules', function () {
//   //
//   //        let personData = FormSchema.Util.GetAbstractRule(this.FormSchema);
//   //        console.log(JSON.stringify(personData));
//   //
//   //
//   ////        let contactRow = FormSchema.Util.GetFormValues(this.FormSchema.Person.properties.Contacts.items.properties);
//   ////        console.log(JSON.stringify(contactRow));
//   //    });

//   it('fill undefined - some errors', function () {

//     // when
//     this.Data.Contacts = undefined;

//     // excercise
//     let result = this.MainValidator.Validate(this.Data);

//     // verify
//     expect(result.HasErrors).to.equal(true);

//   });

//   it('fill 1 item - minItems errors', function () {

//     // when
//     this.Data.Contacts.push(getItemDataTemplate());

//     // excercise
//     let result = this.MainValidator.Validate(this.Data);

//     // verify
//     expect(result.Errors['Contacts'].ValidationFailures['minItems'].HasError).to.equal(true);

//   });

//   it('fill 5 items - maxItems errors', function () {

//     // when
//     this.Data.Contacts.push(getItemDataTemplate());
//     this.Data.Contacts.push(getItemDataTemplate());
//     this.Data.Contacts.push(getItemDataTemplate());
//     this.Data.Contacts.push(getItemDataTemplate());
//     this.Data.Contacts.push(getItemDataTemplate());


//     // excercise
//     let result = this.MainValidator.Validate(this.Data);

//     // verify
//     expect(result.Errors['Contacts'].ValidationFailures['maxItems'].HasError).to.equal(true);

//   });
//   it('fill correct data - no errors', function () {

//     // when
//     this.Data.Contacts.push(getItemDataTemplate());
//     this.Data.Contacts.push(getItemDataTemplate());
//     this.Data.Contacts.push(getItemDataTemplate());

//     // excercise
//     let result = this.MainValidator.Validate(this.Data);

//     // verify
//     expect(result.HasErrors).to.equal(false);

//   });


//   it('fill incorrect data - some errors', function () {

//     // when
//     this.Data.Contacts.push(getItemDataTemplate());
//     this.Data.Contacts.push(getItemDataTemplate());
//     this.Data.Contacts.push(getItemDataTemplate());

//     // simulate error at second item in list
//     this.Data.Contacts[1].Email = '';

//     // simulate async error at third item in list
//     this.Data.Contacts[2].Mobile.CountryCode = 'BLA';

//     // excercise
//     let result = this.MainValidator.Validate(this.Data);

//     // verify
//     expect(result.HasErrors).to.equal(true);
//     expect(result.Errors['Contacts'].HasErrors).to.equal(true);
//     expect(result.Errors['Contacts'].Children[0].HasErrors).to.equal(false);
//     expect(result.Errors['Contacts'].Children[1].HasErrors).to.equal(true);
//     expect(result.Errors['Contacts'].Children[2].HasErrors).to.equal(true);

//   });

//   it('delete error item, leave correct item - no errors', function () {

//     // when
//     this.Data.Contacts.push(getItemDataTemplate());
//     this.Data.Contacts.push(getItemDataTemplate());
//     this.Data.Contacts.push(getItemDataTemplate());

//     // item list property error
//     this.Data.Contacts[2].Email = '';

//     // item list async property error
//     this.Data.Contacts[2].Mobile.CountryCode = 'BLA';

//     // delete last error item
//     this.Data.Contacts.splice(2, 1);

//     // excercise
//     let result = this.MainValidator.Validate(this.Data);

//     // verify
//     expect(result.HasErrors).to.equal(false);
//     expect(result.Errors['Contacts'].HasErrors).to.equal(false);
//     expect(result.Errors['Contacts'].Children[0].HasErrors).to.equal(false);
//     expect(result.Errors['Contacts'].Children[1].HasErrors).to.equal(false);


//   });

//   it('delete correct item, leave error item - some errors', function () {

//     // when
//     this.Data.Contacts.push(getItemDataTemplate());
//     this.Data.Contacts.push(getItemDataTemplate());
//     this.Data.Contacts.push(getItemDataTemplate());

//     // item list property error
//     this.Data.Contacts[2].Email = '';

//     // item list async property error
//     this.Data.Contacts[2].Mobile.CountryCode = 'BLA';

//     // delete correct item
//     this.Data.Contacts.splice(1, 1);

//     // excercise
//     let result = this.MainValidator.Validate(this.Data);

//     // verify
//     expect(result.HasErrors).to.equal(true);
//     expect(result.Errors['Contacts'].HasErrors).to.equal(true);
//     expect(result.Errors['Contacts'].Children[0].HasErrors).to.equal(false);
//     expect(result.Errors['Contacts'].Children[1].HasErrors).to.equal(true);


//   });
// });
//           },
//           Number: {
//             rules: { required: true, maxlength: 9 }
//           }
//         },
//         FixedLine: {
//           CountryCode: {
//             rules: { required: true, maxlength: 3, enum: ['FRA', 'CZE', 'USA', 'GER'] }
//           },
//           Number: {
//             rules: { required: true, maxlength: 9 }
//           }
//         }
//       }, { maxItems: 4, minItems: 2 }
//     ]
//   };

//   // setup
//   let getData = function () {
//     return {
//       Checked: true,
//       FirstName: 'John',
//       LastName: 'Smith',
//       Contacts: []
//     };
//   };

//   //
//   let getItemDataTemplate = function () {
//     return {
//       Email: 'mail@gmail.com',
//       Mobile: {
//         CountryCode: 'CZE',
//         Number: '736483690'
//       },
//       FixedLine: {
//         CountryCode: 'USA',
//         Number: '736483690'
//       }
//     };
//   };

//   beforeEach(function () {

//     this.Data = getData();

//     this.Data.FirstName = 'John';
//     this.Data.LastName = 'Smith';
//     this.MainValidator = new FormSchema.JQueryValidationRuleFactory(metaData).CreateRule('Main');


//   });

//   describe('email', function () {

//     it('fill no email', function () {
//       // when
//       this.Data.Contacts.push(getItemDataTemplate());
//       this.Data.Contacts[0] = {};

//       // exec
//       let result = this.MainValidator.Validate(this.Data);

//       // verify
//       expect(result.Errors['Contacts'].Children[0].Errors['Email'].HasErrors).to.equal(true);
//     });

//     it('fill wrong email', function () {
//       // when
//       this.Data.Contacts.push(getItemDataTemplate());
//       this.Data.Contacts[0].Email = 'jsmith.com';

//       // exec
//       let result = this.MainValidator.Validate(this.Data);

//       // verify
//       expect(result.Errors['Contacts'].Children[0].Errors['Email'].HasErrors).to.equal(true);
//     });

//     it('fill some email', function () {
//       // when
//       this.Data.Contacts.push(getItemDataTemplate());
//       this.Data.Contacts[0].Email = 'jsmith@gmail.com';

//       // exec
//       let result = this.MainValidator.Validate(this.Data);

//       // verify
//       expect(result.Errors['Contacts'].Children[0].Errors['Email'].HasErrors).to.equal(false);
//     });
//   });

//   //    it('form values - parsing', function () {
//   //
//   //        let personData = FormSchema.Util.GetFormValues(this.FormSchema);
//   //        console.log(JSON.stringify(personData));
//   //
//   //        let contactRow = FormSchema.Util.GetFormValues(this.FormSchema.Contacts.items.properties);
//   //        console.log(JSON.stringify(contactRow));
//   //    });
//   //
//   //    it('form rules', function () {
//   //
//   //        let personData = FormSchema.Util.GetAbstractRule(this.FormSchema);
//   //        console.log(JSON.stringify(personData));
//   //
//   //
//   ////        let contactRow = FormSchema.Util.GetFormValues(this.FormSchema.Person.properties.Contacts.items.properties);
//   ////        console.log(JSON.stringify(contactRow));
//   //    });

//   it('fill undefined - some errors', function () {

//     // when
//     this.Data.Contacts = undefined;

//     // excercise
//     let result = this.MainValidator.Validate(this.Data);

//     // verify
//     expect(result.HasErrors).to.equal(true);

//   });

//   it('fill 1 item - minItems errors', function () {

//     // when
//     this.Data.Contacts.push(getItemDataTemplate());

//     // excercise
//     let result = this.MainValidator.Validate(this.Data);

//     // verify
//     expect(result.Errors['Contacts'].ValidationFailures['minItems'].HasError).to.equal(true);

//   });

//   it('fill 5 items - maxItems errors', function () {

//     // when
//     this.Data.Contacts.push(getItemDataTemplate());
//     this.Data.Contacts.push(getItemDataTemplate());
//     this.Data.Contacts.push(getItemDataTemplate());
//     this.Data.Contacts.push(getItemDataTemplate());
//     this.Data.Contacts.push(getItemDataTemplate());


//     // excercise
//     let result = this.MainValidator.Validate(this.Data);

//     // verify
//     expect(result.Errors['Contacts'].ValidationFailures['maxItems'].HasError).to.equal(true);

//   });
//   it('fill correct data - no errors', function () {

//     // when
//     this.Data.Contacts.push(getItemDataTemplate());
//     this.Data.Contacts.push(getItemDataTemplate());
//     this.Data.Contacts.push(getItemDataTemplate());

//     // excercise
//     let result = this.MainValidator.Validate(this.Data);

//     // verify
//     expect(result.HasErrors).to.equal(false);

//   });


//   it('fill incorrect data - some errors', function () {

//     // when
//     this.Data.Contacts.push(getItemDataTemplate());
//     this.Data.Contacts.push(getItemDataTemplate());
//     this.Data.Contacts.push(getItemDataTemplate());

//     // simulate error at second item in list
//     this.Data.Contacts[1].Email = '';

//     // simulate async error at third item in list
//     this.Data.Contacts[2].Mobile.CountryCode = 'BLA';

//     // excercise
//     let result = this.MainValidator.Validate(this.Data);

//     // verify
//     expect(result.HasErrors).to.equal(true);
//     expect(result.Errors['Contacts'].HasErrors).to.equal(true);
//     expect(result.Errors['Contacts'].Children[0].HasErrors).to.equal(false);
//     expect(result.Errors['Contacts'].Children[1].HasErrors).to.equal(true);
//     expect(result.Errors['Contacts'].Children[2].HasErrors).to.equal(true);

//   });

//   it('delete error item, leave correct item - no errors', function () {

//     // when
//     this.Data.Contacts.push(getItemDataTemplate());
//     this.Data.Contacts.push(getItemDataTemplate());
//     this.Data.Contacts.push(getItemDataTemplate());

//     // item list property error
//     this.Data.Contacts[2].Email = '';

//     // item list async property error
//     this.Data.Contacts[2].Mobile.CountryCode = 'BLA';

//     // delete last error item
//     this.Data.Contacts.splice(2, 1);

//     // excercise
//     let result = this.MainValidator.Validate(this.Data);

//     // verify
//     expect(result.HasErrors).to.equal(false);
//     expect(result.Errors['Contacts'].HasErrors).to.equal(false);
//     expect(result.Errors['Contacts'].Children[0].HasErrors).to.equal(false);
//     expect(result.Errors['Contacts'].Children[1].HasErrors).to.equal(false);


//   });

//   it('delete correct item, leave error item - some errors', function () {

//     // when
//     this.Data.Contacts.push(getItemDataTemplate());
//     this.Data.Contacts.push(getItemDataTemplate());
//     this.Data.Contacts.push(getItemDataTemplate());

//     // item list property error
//     this.Data.Contacts[2].Email = '';

//     // item list async property error
//     this.Data.Contacts[2].Mobile.CountryCode = 'BLA';

//     // delete correct item
//     this.Data.Contacts.splice(1, 1);

//     // excercise
//     let result = this.MainValidator.Validate(this.Data);

//     // verify
//     expect(result.HasErrors).to.equal(true);
//     expect(result.Errors['Contacts'].HasErrors).to.equal(true);
//     expect(result.Errors['Contacts'].Children[0].HasErrors).to.equal(false);
//     expect(result.Errors['Contacts'].Children[1].HasErrors).to.equal(true);


//   });
});
