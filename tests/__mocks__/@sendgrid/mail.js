/**mocks are good to use when you want to 'mock' or copy the functionality of a module or class 
 * but don't want its stuff to fire off.
 * For example, here we are trying to minimize the free uses of sending emails from sendgrid.
 * With the mock, the functionality has been simulated.
 * Since we're not using any sort of return value, having them be empty functions works great here.
 * Essentially, the functions aren't doing anything, and we don't really need them to.
*/
module.exports = {
    setApiKey() {

    },
    send() {

    }
}