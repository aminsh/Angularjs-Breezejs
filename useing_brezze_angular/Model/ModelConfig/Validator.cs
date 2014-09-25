using System;

namespace useing_brezze_angular.Model.ModelConfig
{
    public abstract class Validator
    {
        public string Name { get; set; }
        public string ErrorMessage { get; set; }
    }

    public class RequiredValidator : Validator
    {
        public RequiredValidator()
        {
            Name = "Required";
        }
    }

    public class EmailAddressValidator : Validator
    {
        public EmailAddressValidator()
        {
            Name = "EmailAddress";
        }
    }

    public class StringLengthValidator : Validator
    {
        public StringLengthValidator()
        {
            Name = "StringLength";
        }

        public Int32 MinLength { get; set; }
        public Int32 MaxLength { get; set; }
    }

    public class CompareValidator : Validator
    {
        public CompareValidator()
        {
            Name = "Compare";
        }
        public string OtherPropertyName { get; set; }
    }
}
